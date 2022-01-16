import { ApiProperty } from '@nestjs/swagger';

export class GetRankResponse {
  @ApiProperty()
  _id: string;

  @ApiProperty()
  email: string;

  @ApiProperty()
  name: string;

  @ApiProperty()
  coin: number;
}
