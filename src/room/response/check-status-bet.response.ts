import { ApiProperty } from '@nestjs/swagger';

export class CheckStatusBetResponse {
  @ApiProperty()
  status: boolean;
}
