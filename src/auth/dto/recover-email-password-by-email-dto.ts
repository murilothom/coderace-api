import { ApiProperty } from '@nestjs/swagger';
import { IsString, MinLength } from 'class-validator';

export class RecoverPasswordByEmailDto {
  @ApiProperty({ type: String, example: '123456' })
  @IsString()
  @MinLength(6)
  newPassword: string;

  @ApiProperty({ type: String, example: '123456' })
  @IsString()
  @MinLength(6)
  confirmPassword: string;
}
