import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsString, MinLength, IsArray } from 'class-validator';

export class CreateFeedbackDto {
  @ApiProperty({ type: [Number], example: [4, 5, 3] })
  @IsArray()
  rating: number[];

  @ApiPropertyOptional({ type: String, example: 'Estou triste' })
  @IsString()
  @MinLength(1)
  comment?: string;
}
