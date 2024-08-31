import {
  BadRequestException,
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateEnterpriseDto } from './dto/create-enterprise-dto';
import { UserPayload } from '../auth/jtw.strategy';
import { Enterprise } from './schemas/enterprise.schema';
import { EnterpriseDto } from './dto/enterprise-dto';
import { hash } from 'bcryptjs';
import { Employee } from '../employee/schemas/employee.schema';

@Injectable()
export class EnterpriseService {
  constructor(
    @InjectModel(Enterprise.name)
    private readonly enterpriseModel: Model<Enterprise>,
    @InjectModel(Employee.name)
    private readonly employeeModel: Model<Employee>,
  ) {}

  async getCurrentEnterprise(currentUser: UserPayload): Promise<EnterpriseDto> {
    const { sub } = currentUser;

    const enterprise = await this.enterpriseModel.findById(sub);

    if (!enterprise) {
      throw new NotFoundException('Empresa não existe.');
    }

    return {
      id: enterprise.id,
      name: enterprise.name,
      email: enterprise.email,
      document: enterprise.document,
    };
  }

  async create(dto: CreateEnterpriseDto): Promise<void> {
    const { name, email, document, confirmPassword, password } = dto;

    const enterpriseWithSameEmail = await this.enterpriseModel.findOne().where({
      email: dto.email,
    });

    if (enterpriseWithSameEmail?.toObject()) {
      throw new ConflictException(
        'Já existe uma empresa cadastrado com este e-mail.',
      );
    }

    if (password !== confirmPassword) {
      throw new BadRequestException('As senhas devem ser iguais');
    }

    const passwordHash = await hash(password, 6);

    await this.enterpriseModel.create({
      name,
      email,
      passwordHash,
      document,
    });
  }
}
