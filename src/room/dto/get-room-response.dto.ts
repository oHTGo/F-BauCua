import { ApiProperty } from '@nestjs/swagger';

export class GetRoomResponse {
  @ApiProperty()
  _id: string;

  @ApiProperty()
  name: string;
}
