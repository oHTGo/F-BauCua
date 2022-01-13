import { ApiProperty } from '@nestjs/swagger';

export class GetProfileResponse {
  @ApiProperty()
  _id: string;

  @ApiProperty()
  email: string;

  @ApiProperty()
  name: string;

  @ApiProperty()
  coin: number;
}
