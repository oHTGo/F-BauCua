import { Controller, Get } from '@nestjs/common';
import { ApiBearerAuth, ApiExtraModels, ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { ApiResponse } from '../app/apiResponse';
import { CurrentUser } from '../app/decorators/user.decorator';
import { DocsResponser } from '../app/docs/DocsResponser';
import { ICurrentUser } from '../app/interfaces/ICurrentUser.interface';
import { ResponseServer } from '../app/responseServer';
import { GetProfileResponse } from './response/get-profile.response';
import { UserService } from './user.service';

@Controller('user')
@ApiBearerAuth()
@ApiTags('user')
@ApiExtraModels(ResponseServer, GetProfileResponse)
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  @ApiOperation({ summary: 'Get profile' })
  @ApiOkResponse(DocsResponser.sendOkItem(GetProfileResponse))
  async getProfile(@CurrentUser() user: ICurrentUser) {
    const userDB = await this.userService.findById(user.id);
    const { _id, email, name, role, coin } = userDB;
    const response: GetProfileResponse = {
      _id,
      name,
      email,
      role,
      coin,
    };

    return ApiResponse.send<GetProfileResponse>('Get profile successfully', response);
  }
}
