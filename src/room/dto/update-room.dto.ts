import { PartialType } from '@nestjs/mapped-types';
import { ApiProperty } from '@nestjs/swagger';
import { CreateRoomDto } from './create-room.dto';

export class UpdateRoomDto extends PartialType(CreateRoomDto) {
  @ApiProperty()
  name: string;
}
