import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsString, MinLength, IsNumber } from 'class-validator';

export class FeedbackDto {
  @ApiProperty({ type: String, example: 'Development' })
  @IsString()
  sector: string;

  @ApiProperty({ type: Number, example: 7 })
  @IsNumber()
  averageRating: number;

  @ApiPropertyOptional({ type: String, example: 'Resposta da IA' })
  @IsString()
  @MinLength(1)
  insight: string;
}
