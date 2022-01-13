import { ApiProperty } from '@nestjs/swagger';

export class SocketResponse {
  @ApiProperty()
  room: string;

  @ApiProperty()
  rollResult: number[];
}
