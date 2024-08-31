import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsEmail, MinLength, IsEnum } from 'class-validator';
import { Role } from '../schemas/employee.schema';

export class UpdateEmployeeDto {
  @ApiProperty({ type: String, example: 'Fulano' })
  @IsString()
  @MinLength(1)
  name: string;

  @ApiProperty({ type: String, example: 'fulano@email.com' })
  @IsEmail()
  email: string;

  @ApiProperty({ type: String, example: 'Development' })
  @IsString()
  @MinLength(1)
  sector: string;

  @ApiProperty({ enum: Role, example: Role.EMPLOYEE })
  @IsEnum(Role)
  role: Role;
}
