import { ApiProperty } from '@nestjs/swagger';
import { IsString, MinLength } from 'class-validator';

export class SectorDto {
  @ApiProperty({ type: String, example: 'Fulano' })
  @IsString()
  @MinLength(1)
  sector: string;
}
