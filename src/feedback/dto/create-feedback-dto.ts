import { ApiProperty } from '@nestjs/swagger';
import { IsArray } from 'class-validator';
import { AnswerDto } from './answer-dto';

export class CreateFeedbackDto {
  @ApiProperty({
    type: [AnswerDto],
    example: [AnswerDto],
  })
  @IsArray()
  answers: AnswerDto[];
}
