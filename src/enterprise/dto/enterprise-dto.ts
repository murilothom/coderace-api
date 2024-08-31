import { ApiProperty } from '@nestjs/swagger';
import { IsString, MinLength, IsMongoId } from 'class-validator';

export class EnterpriseDto {
  @ApiProperty({ type: String, example: '66ce7893156b20008c06e1b1' })
  @IsMongoId()
  id: string;

  @ApiProperty({ type: String, example: 'Fulano' })
  @IsString()
  @MinLength(1)
  name: string;

  @ApiProperty({ type: String, example: '128931298389' })
  @IsString()
  @MinLength(14)
  document: string;
}
