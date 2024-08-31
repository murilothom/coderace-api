import {
  ConflictException,
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateEmployeeDto } from './dto/create-employee-dto';
import { UserPayload } from '../auth/jtw.strategy';
import { Employee, Role } from './schemas/employee.schema';
import { EmployeeDto } from './dto/employee-dto';
import { hash } from 'bcryptjs';
import { UpdateEmployeeDto } from './dto/update-employee-dto';
import { MailerService } from '@nestjs-modules/mailer';
import { EnvService } from '../env/env.service';
import { Enterprise } from '../enterprise/schemas/enterprise.schema';

@Injectable()
export class EmployeeService {
  private readonly frontendURL: string;

  constructor(
    @InjectModel(Employee.name)
    private readonly employeeModel: Model<Employee>,
    @InjectModel(Enterprise.name)
    private readonly enterpriseModel: Model<Enterprise>,
    private readonly mailerService: MailerService,
    private readonly envService: EnvService,
  ) {
    this.frontendURL = this.envService.get('FRONTEND_URL');

    this.populateUserAdmin();
  }

  private async populateUserAdmin() {
    const passwordHash = await hash('123456', 6);

    let enterprise = await this.enterpriseModel.findOne({
      name: 'Coderace',
    });

    if (!enterprise?.toObject()) {
      enterprise = await this.enterpriseModel.create({
        name: 'Coderace',
        email: 'admin@coderace.com',
        passwordHash,
        document: '1234567890',
      });
    }

    const userAdmin = await this.employeeModel.findOne({
      email: 'murilo@admin.com',
    });

    if (!userAdmin?.toObject()) {
      await this.employeeModel.create({
        name: 'Murilo',
        email: 'murilo@admin.com',
        passwordHash,
        role: Role.ADMIN,
        sector: 'Development',
        enterpriseId: enterprise.id,
      });
    }
  }

  async findAll(currentUser: UserPayload): Promise<EmployeeDto[]> {
    await this.validatePermissionAndGetEnterpriseId(currentUser.sub);

    const employees = await this.employeeModel.find();

    return employees.map(
      (employee) =>
        ({
          id: employee.id,
          name: employee.name,
          email: employee.email,
          role: employee.role,
          sector: employee.sector,
        }) as EmployeeDto,
    );
  }

  async getById(id: string, currentUser: UserPayload): Promise<EmployeeDto> {
    const { sub } = currentUser;

    await this.validatePermissionAndGetEnterpriseId(sub);

    const employee = await this.employeeModel.findById(id);

    if (!employee?.toObject()) {
      throw new NotFoundException('Colaborador não existe.');
    }

    return {
      id: employee.id,
      name: employee.name,
      email: employee.email,
      role: employee.role,
      sector: employee.sector,
    };
  }

  async getCurrentUser(currentUser: UserPayload): Promise<EmployeeDto> {
    const { sub } = currentUser;

    const employee = await this.employeeModel.findById(sub);

    if (!employee) {
      throw new NotFoundException('Colaborador não existe.');
    }

    return {
      id: employee.id,
      name: employee.name,
      email: employee.email,
      role: employee.role,
      sector: employee.role,
    };
  }

  async create(
    dto: CreateEmployeeDto,
    currentUser: UserPayload,
  ): Promise<void> {
    const enterpriseId = await this.validatePermissionAndGetEnterpriseId(
      currentUser.sub,
    );

    const { name, email, role, sector } = dto;

    const employeeWithSameEmail = await this.employeeModel.findOne().where({
      email: dto.email,
    });

    if (employeeWithSameEmail?.toObject()) {
      throw new ConflictException(
        'Já existe um Colaborador cadastrado com este e-mail.',
      );
    }

    const password = this.generatePassword();
    const passwordHash = await hash(password, 6);

    console.log(password);

    await this.employeeModel.create({
      name,
      email,
      passwordHash,
      role,
      sector,
      enterpriseId,
    });

    const link = `${this.frontendURL}/entrar`;

    await this.mailerService.sendMail({
      to: email,
      from: '"EMP Soluções" <no-reply@empsolucoes.site>',
      subject: 'Criação de conta - EMP Soluções',
      html: `
      <div style="
        display: flex;
        flex-direction: column;
      ">
        <h2 style="font-weight: 400;">Sua senha é <strong>${password}</strong></h2>
        <h4 style="font-weight: 400;">Clique neste <a href="${link}">link</a> para ser fazer login.</h4>
      </div`,
    });
  }

  async update(
    id: string,
    dto: UpdateEmployeeDto,
    currentUser: UserPayload,
  ): Promise<void> {
    await this.validatePermissionAndGetEnterpriseId(currentUser.sub);

    const { name, email, role, sector } = dto;

    const user = await this.employeeModel.findById(id);

    if (!user?.toObject()) {
      throw new ConflictException('Colaborador não existe.');
    }

    const employeeWithSameEmail = await this.employeeModel.findOne({ email });

    if (employeeWithSameEmail?.toObject() && id !== employeeWithSameEmail.id) {
      throw new ConflictException(
        'Já existe um colaborador cadastrado com este e-mail.',
      );
    }

    await this.employeeModel.updateOne(
      { _id: id },
      {
        name,
        email,
        sector,
        role,
      },
    );
  }

  async delete(id: string, currentUser: UserPayload): Promise<void> {
    await this.validatePermissionAndGetEnterpriseId(currentUser.sub);

    const employee = await this.employeeModel.findById(id);

    if (!employee?.toObject()) {
      throw new NotFoundException('Colaborador não existe.');
    }

    await this.employeeModel.deleteOne({
      _id: id,
    });
  }

  private async validatePermissionAndGetEnterpriseId(
    id: string,
  ): Promise<string> {
    const employee = await this.employeeModel.findOne({
      _id: id,
      role: Role.ADMIN,
    });

    const enterprise = await this.enterpriseModel.findById(id);

    if (!employee?.toObject() && !enterprise?.toObject()) {
      throw new ForbiddenException('Sem permissão.');
    }

    return employee?.enterpriseId || enterprise?.id;
  }

  private generatePassword(): string {
    const caracteres =
      'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let codigo = '';
    for (let i = 0; i < 8; i++) {
      const indiceAleatorio = Math.floor(Math.random() * caracteres.length);
      codigo += caracteres.charAt(indiceAleatorio);
    }
    return codigo;
  }
}
