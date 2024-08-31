import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsMongoId } from 'class-validator';

export class QuestionDto {
  @ApiProperty({ type: String, example: '12381236728' })
  @IsMongoId()
  id: string;

  @ApiProperty({ type: String, example: 'Como você está se sentindo...' })
  @IsString()
  question: string;

  @ApiProperty({ type: String, example: 'fim' })
  @IsString()
  journey: 'inicio' | 'fim';
}
