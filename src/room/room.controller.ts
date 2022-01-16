import { BadRequestException, Body, Controller, Delete, Get, NotFoundException, Param, Post, Put, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiExtraModels, ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { ApiResponse } from '../app/apiResponse';
import { Roles } from '../app/decorators/role.decorator';
import { CurrentUser } from '../app/decorators/user.decorator';
import { DocsResponser } from '../app/docs/DocsResponser';
import { RolesGuard } from '../app/guards/RolesGuard.guard';
import { ICurrentUser } from '../app/interfaces/ICurrentUser.interface';
import { ResponseServer } from '../app/responseServer';
import { Role } from '../user/enums/Role.enum';
import { UserService } from '../user/user.service';
import { BetDto } from './dto/bet.dto';
import { CreateRoomDto } from './dto/create-room.dto';
import { GetAllRoomsResponse } from './dto/get-all-rooms-response.dto';
import { GetRoomResponse } from './dto/get-room-response.dto';
import { IdParamDto } from './dto/id-param.dto';
import { UpdateRoomDto } from './dto/update-room.dto';
import { RoomGateway } from './room.gateway';
import { RoomService } from './room.service';
import { Room } from './schemas/room.schema';

@Controller('room')
@UseGuards(RolesGuard)
@ApiBearerAuth()
@ApiTags('room')
@ApiExtraModels(ResponseServer, GetAllRoomsResponse, GetRoomResponse)
export class RoomController {
  constructor(private readonly roomGateway: RoomGateway, private readonly roomService: RoomService, private readonly userService: UserService) {}

  // === <Admin>
  @Get()
  @Roles(Role.Admin)
  @ApiOperation({ summary: 'Get all rooms' })
  @ApiOkResponse(DocsResponser.sendOkItems(GetAllRoomsResponse))
  async getAll(@CurrentUser() user: ICurrentUser) {
    const rooms = await this.roomService.getAll();

    let response: GetAllRoomsResponse[];

    if (user.role === Role.Admin) {
      response = rooms.map((room) => ({
        _id: room._id,
        name: room.name,
      }));
    } else if (user.role === Role.User) {
      response = rooms.map((room) => ({
        name: room.name,
      }));
    }

    return ApiResponse.send<GetAllRoomsResponse[]>('Get all rooms successfully', response);
  }

  @Get(':id')
  @Roles(Role.Admin)
  @ApiOperation({ summary: 'Get a room' })
  @ApiOkResponse(DocsResponser.sendOkItem(GetAllRoomsResponse))
  async getById(@Param() { id }: IdParamDto) {
    const room = await this.roomService.findOneById(id);
    if (!room) throw new NotFoundException('Room does not exist');

    const { _id, name } = room;
    const response: GetRoomResponse = {
      _id,
      name,
    };
    return ApiResponse.send<GetRoomResponse>('Get all rooms successfully', response);
  }

  @Post()
  @Roles(Role.Admin)
  @ApiOperation({ summary: 'Create a room' })
  @ApiOkResponse(DocsResponser.sendOk())
  async create(@Body() { name }: CreateRoomDto) {
    const newRoom = new Room();
    newRoom.name = name;
    await this.roomService.create(newRoom);

    return ApiResponse.send('Create room successfully');
  }

  @Put(':id')
  @Roles(Role.Admin)
  @ApiOperation({ summary: 'Update a room' })
  @ApiOkResponse(DocsResponser.sendOk())
  async update(@Param() { id }: IdParamDto, @Body() { name }: UpdateRoomDto) {
    const roomDB = await this.roomService.findOneById(id);
    if (!roomDB) throw new NotFoundException('Room does not exist');

    roomDB.name = name;
    await this.roomService.updateOneById(id, roomDB);

    return ApiResponse.send('Update room successfully');
  }

  @Delete(':id')
  @Roles(Role.Admin)
  @ApiOperation({ summary: 'Delete a room' })
  @ApiOkResponse(DocsResponser.sendOk())
  async delete(@Param() { id }: IdParamDto) {
    const roomDB = await this.roomService.findOneById(id);
    if (!roomDB) throw new NotFoundException('Room does not exist');

    await this.roomService.deleteOneById(id);

    return ApiResponse.send('Delete room successfully');
  }

  @Post(':id/roll')
  @Roles(Role.Admin)
  @ApiOperation({ summary: 'Roll dice' })
  @ApiOkResponse(DocsResponser.sendOk())
  async roll(@Param() { id }: IdParamDto) {
    const roomDB = await this.roomService.findOneById(id);
    if (!roomDB) throw new NotFoundException('Room does not exist');

    const rollResult = await this.roomService.roll(id);
    await this.roomGateway.sendMessage({ room: id, rollResult });

    const rollResultMap = new Map<number, number>();
    for (const roll of rollResult) {
      const value = rollResultMap.get(roll) ?? 0;
      rollResultMap.set(roll, value + 1);
    }

    const { betResult } = roomDB;

    const queue = [];
    for (const [userId, bet] of betResult) {
      const totalCoin = bet.reduce((total, coin, index) => {
        if (coin <= 0) return total;
        const multiplication = (rollResultMap.get(index) ?? -1) + 1;
        return total + coin * multiplication;
      }, 0);

      queue.push(
        (async () => {
          if (totalCoin <= 0) return;
          const userDB = await this.userService.findById(userId);
          await this.userService.updateCoin(userId, userDB.coin + totalCoin);
        })(),
      );
    }
    await Promise.all(queue);
    await this.roomService.resetBetResult(id);
    return ApiResponse.send('Roll successfully');
  }

  @Post(':id/reset-and-get-rank')
  @Roles(Role.Admin)
  @ApiOperation({ summary: 'Reset room and get rank' })
  @ApiOkResponse(DocsResponser.sendOk())
  async reset(@Param() { id }: IdParamDto) {
    const roomDB = await this.roomService.findOneById(id);
    if (!roomDB) throw new NotFoundException('Room does not exist');

    const { members } = roomDB;
    const users = await this.userService.getTop10CoinByIds(members);

    await this.roomService.resetRoom(id);

    return ApiResponse.send('Reset room and get rank successfully', users);
  }
  // === </Admin>

  // === <User>
  @Post(':id/join')
  @Roles(Role.User)
  @ApiOperation({ summary: 'Join a room' })
  @ApiOkResponse(DocsResponser.sendOk())
  async join(@CurrentUser() user: ICurrentUser, @Param() { id }: IdParamDto) {
    const roomDB = await this.roomService.findOneById(id);
    if (!roomDB) throw new NotFoundException('Room does not exist');

    const existed = await this.roomService.checkUserInAllRooms(user.id);
    if (existed) throw new BadRequestException('User has joined a room before');

    await this.roomService.join(id, user.id);

    return ApiResponse.send('Join room successfully');
  }

  @Post(':id/bet')
  @Roles(Role.User)
  @ApiOperation({ summary: 'Bet' })
  @ApiOkResponse(DocsResponser.sendOk())
  async bet(@CurrentUser() user: ICurrentUser, @Param() { id }: IdParamDto, @Body() { bet }: BetDto) {
    const roomDB = await this.roomService.findOneById(id);
    if (!roomDB) throw new NotFoundException('Room does not exist');

    const joined = roomDB.members.includes(user.id);
    if (!joined) throw new BadRequestException('User must join room before bet');

    const { betResult } = roomDB;
    if (betResult.has(user.id)) throw new BadRequestException('User has bet this turn');

    const totalCoin = bet.reduce((total, coin) => total + coin, 0);
    if (totalCoin <= 0) throw new BadRequestException('Can not bet with 0');

    const userDB = await this.userService.findById(user.id);
    if (userDB.coin - totalCoin < 0) throw new BadRequestException('Not enough coins to bet');

    betResult.set(user.id, bet);
    await this.roomService.saveBet(id, betResult);
    await this.userService.updateCoin(user.id, userDB.coin - totalCoin);

    return ApiResponse.send('Bet successfully');
  }
  // === </User
}
