import { ApiProperty } from '@nestjs/swagger';
import { IsMongoId, IsNumber, Max, Min } from 'class-validator';

export class AnswerDto {
  @ApiProperty({ type: String, example: 'q1' })
  @IsMongoId()
  questionId: string;

  @ApiProperty({ type: Number, example: 5 })
  @IsNumber()
  @Min(1)
  @Max(5)
  rate: number;
}
