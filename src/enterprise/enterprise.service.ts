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
import { Employee, Role } from '../employee/schemas/employee.schema';

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

    const employee = await this.employeeModel.findById(sub);

    if (!employee?.toObject()) {
      throw new NotFoundException('Colaborador não existe.');
    }

    const enterprise = await this.enterpriseModel.findById(
      employee?.enterpriseId,
    );

    if (!enterprise) {
      throw new NotFoundException('Empresa não existe.');
    }

    return {
      id: enterprise.id,
      name: enterprise.name,
      document: enterprise.document,
    };
  }

  async create(dto: CreateEnterpriseDto): Promise<void> {
    const { enterpriseName, name, email, document, confirmPassword, password } =
      dto;

    const enterpriseWithSameDocument = await this.enterpriseModel
      .findOne()
      .where({
        document: dto.document,
      });

    if (enterpriseWithSameDocument?.toObject()) {
      throw new ConflictException(
        'Já existe uma empresa cadastrado com este documento.',
      );
    }

    const employeeWithSameEmail = await this.employeeModel.findOne().where({
      email: dto.email,
    });

    if (employeeWithSameEmail?.toObject()) {
      throw new ConflictException(
        'Já existe um colaborador cadastrado com este e-mail.',
      );
    }

    if (password !== confirmPassword) {
      throw new BadRequestException('As senhas devem ser iguais');
    }

    const passwordHash = await hash(password, 6);

    const enterprise = await this.enterpriseModel.create({
      name: enterpriseName,
      email,
      passwordHash,
      document,
    });

    await this.employeeModel.create({
      name,
      email,
      passwordHash,
      sector: 'Dono',
      role: Role.OWNER,
      enterpriseId: enterprise.id,
    });
  }
}
