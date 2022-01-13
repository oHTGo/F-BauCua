import { ApiProperty } from '@nestjs/swagger';
import { ArrayMaxSize, ArrayMinSize, IsNumber } from 'class-validator';

export class BetDto {
  @IsNumber({}, { each: true })
  @ArrayMinSize(6)
  @ArrayMaxSize(6)
  @ApiProperty({
    type: [Number],
    description: 'An array of 6 elements corresponding to 6 animals in the game, the number of each element represents the number of coins bet',
    example: '[1,0,0,0,0,0]',
  })
  bet: number[];
}
