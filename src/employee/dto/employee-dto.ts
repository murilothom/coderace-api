import { ApiProperty } from '@nestjs/swagger';
import {
  IsString,
  IsEmail,
  MinLength,
  IsMongoId,
  IsEnum,
} from 'class-validator';
import { Role } from '../schemas/employee.schema';

export class EmployeeDto {
  @ApiProperty({ type: String, example: '66ce7893156b20008c06e1b1' })
  @IsMongoId()
  id: string;

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

  @ApiProperty({ enum: Role, example: Role.ADMIN })
  @IsEnum(Role)
  role: Role;
}
