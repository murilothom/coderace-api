import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString, MinLength } from 'class-validator';

export class LoginDto {
  @ApiProperty({ type: String, example: 'fulano@email.com' })
  @IsEmail()
  email: string;

  @ApiProperty({ type: String, example: '123456' })
  @IsString()
  @MinLength(6)
  password: string;
}
