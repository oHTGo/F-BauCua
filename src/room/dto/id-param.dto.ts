import { ApiProperty } from '@nestjs/swagger';
import { IsMongoId } from 'class-validator';

export class IdParamDto {
  @IsMongoId()
  @ApiProperty({ description: 'Room ID' })
  id: string;
}
