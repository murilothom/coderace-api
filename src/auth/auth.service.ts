import { ConflictException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { compare } from 'bcryptjs';
import { AuthenticateUserDto } from './dto/authenticate-user-dto';
import { JwtService } from '@nestjs/jwt';
import { LoginDto } from './dto/login-dto';
import * as dayjs from 'dayjs';
import 'dayjs/locale/pt-br';
import { Employee } from '../employee/schemas/employee.schema';
import { Enterprise } from '../enterprise/schemas/enterprise.schema';
dayjs.locale('pt-br');

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(Employee.name)
    private readonly employeeModel: Model<Employee>,
    @InjectModel(Enterprise.name)
    private readonly enterpriseModel: Model<Enterprise>,
    private readonly jwtService: JwtService,
  ) {}

  async authenticate(dto: LoginDto): Promise<AuthenticateUserDto> {
    const { email, password } = dto;

    const employee = await this.employeeModel.findOne().where({
      email,
    });

    const enterprise = await this.enterpriseModel.findOne().where({
      email,
    });

    if (!employee?.toObject() && !enterprise?.toObject()) {
      throw new ConflictException('Credenciais inválidas.');
    }

    const hashed = employee?.passwordHash || enterprise?.passwordHash || '';

    const isPasswordValid = await compare(password, hashed);

    if (!isPasswordValid) {
      throw new ConflictException('Credenciais inválidas.');
    }

    const id = employee?.id || enterprise?.id;

    const accessToken = await this.jwtService.signAsync({ sub: id });

    return {
      access_token: accessToken,
    };
  }
}
