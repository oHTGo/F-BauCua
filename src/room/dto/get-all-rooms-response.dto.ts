import { ApiProperty } from '@nestjs/swagger';

export class GetAllRoomsResponse {
  @ApiProperty()
  _id: string;

  @ApiProperty()
  name: string;
}
