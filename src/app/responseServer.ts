import { ApiProperty } from '@nestjs/swagger';

export class ResponseServer<T> {
  @ApiProperty()
  message: string;

  data?: T;
}
