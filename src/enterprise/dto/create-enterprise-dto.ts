import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsEmail, MinLength, Length } from 'class-validator';

export class CreateEnterpriseDto {
  @ApiProperty({ type: String, example: 'Code race' })
  @IsString()
  @MinLength(1)
  enterpriseName: string;

  @ApiProperty({ type: String, example: '128931298389' })
  @IsString()
  @Length(14)
  document: string;

  @ApiProperty({ type: String, example: 'Fulano' })
  @IsString()
  @MinLength(1)
  name: string;

  @ApiProperty({ type: String, example: 'Desenvolvimento' })
  @IsString()
  @MinLength(1)
  sector: string;

  @ApiProperty({ type: String, example: 'fulano@coderace.com' })
  @IsEmail()
  email: string;

  @ApiProperty({ type: String, example: '123456' })
  @IsString()
  @MinLength(6)
  password: string;

  @ApiProperty({ type: String, example: '123456' })
  @IsString()
  @MinLength(6)
  confirmPassword: string;
}
