import { Controller, Post, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiExtraModels, ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { DocsResponser } from 'src/app/docs/DocsResponser';
import { ResponseServer } from 'src/app/responseServer';
import { ApiResponse } from '../app/apiResponse';
import { Roles } from '../app/decorators/role.decorator';
import envConfig from '../app/envConfig';
import { RolesGuard } from '../app/guards/RolesGuard.guard';
import { RoomService } from '../room/room.service';
import { Role } from '../user/enums/Role.enum';
import { UserService } from '../user/user.service';

@Controller('root')
@UseGuards(RolesGuard)
@ApiBearerAuth()
@ApiTags('root')
@ApiExtraModels(ResponseServer)
export class RootController {
  constructor(private readonly userService: UserService, private readonly roomService: RoomService) {}

  @Post('reset-all')
  @ApiOperation({ summary: 'Reset all coin users & rooms' })
  @ApiOkResponse(DocsResponser.sendOk())
  @Roles(Role.Root)
  async resetAll() {
    const users = await this.userService.getAll();
    users.forEach((user) => {
      this.userService.updateCoin(user.id, Number(envConfig().DEFAULT_COIN));
    });

    const rooms = await this.roomService.getAll();
    rooms.forEach((room) => {
      this.roomService.resetRoom(room.id);
    });

    return ApiResponse.send('Reset all successfully');
  }
}
