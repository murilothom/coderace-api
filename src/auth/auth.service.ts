import {
  BadRequestException,
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { compare, hash } from 'bcryptjs';
import { AuthenticateUserDto } from './dto/authenticate-user-dto';
import { JwtService } from '@nestjs/jwt';
import { LoginDto } from './dto/login-dto';
import * as dayjs from 'dayjs';
import 'dayjs/locale/pt-br';
import { Employee } from '../employee/schemas/employee.schema';
import { RecoverPasswordByEmailDto } from './dto/recover-email-password-by-email-dto';
import { MailerService } from '@nestjs-modules/mailer';
import { EnvService } from '../env/env.service';
import { Code } from './schema/code.schema';
import { randomUUID } from 'crypto';
dayjs.locale('pt-br');

@Injectable()
export class AuthService {
  private readonly frontendURL: string;

  constructor(
    @InjectModel(Employee.name)
    private readonly employeeModel: Model<Employee>,
    @InjectModel(Code.name)
    private readonly codeModel: Model<Code>,
    private readonly jwtService: JwtService,
    private readonly mailerService: MailerService,
    private readonly envService: EnvService,
  ) {
    this.frontendURL = this.envService.get('FRONTEND_URL');
  }

  async authenticate(dto: LoginDto): Promise<AuthenticateUserDto> {
    const { email, password } = dto;

    const employee = await this.employeeModel.findOne().where({
      email,
    });

    if (!employee?.toObject()) {
      throw new ConflictException('Credenciais inválidas.');
    }

    const isPasswordValid = await compare(password, employee.passwordHash);

    if (!isPasswordValid) {
      throw new ConflictException('Credenciais inválidas.');
    }

    const accessToken = await this.jwtService.signAsync({ sub: employee.id });

    return {
      access_token: accessToken,
    };
  }

  async generateCodeToRecoverPassword(email: string): Promise<void> {
    const employee = await this.employeeModel.findOne().where({
      email,
    });

    if (!employee?.toObject()) {
      throw new NotFoundException('Usuário não existe.');
    }

    const existentCode = await this.codeModel.findOne({
      employeeId: employee.id,
    });

    if (existentCode) {
      const tenMinutesAgo = dayjs().subtract(10, 'minutes');
      const codeCreatedTime = dayjs(new Date(existentCode.createdDate));

      // Código expirado após 10 minutos
      if (codeCreatedTime.isBefore(tenMinutesAgo)) {
        await this.codeModel.deleteOne({
          _id: existentCode._id,
        });
      }

      const now = dayjs();
      const lastSentTime = dayjs(new Date(existentCode.lastSentDate));
      const twoMinutesAfterCreatedTime = lastSentTime.add(2, 'minutes');
      // E-mail poderá ser enviado de novo após 2 minutos da criação
      if (now.isAfter(twoMinutesAfterCreatedTime)) {
        const link = `${this.frontendURL}/recuperar-senha/${existentCode.code}/${employee.email}`;

        await this.codeModel.updateOne(
          {
            _id: existentCode._id,
          },
          {
            lastSentDate: new Date(),
          },
        );

        await this.mailerService.sendMail({
          to: email,
          from: '"EMP Soluções" <no-reply@empsolucoes.site>',
          subject: 'Recuperação de senha - EMP Soluções',
          html: `<h4 style="font-weight: 400;">Clique <a href="${link}">neste link</a> para fazer a recuperação da sua senha</h3>`,
        });
      }
      return;
    }

    const generateCode = randomUUID();

    await this.codeModel.create({
      code: generateCode,
      employeeId: employee.id,
      email: employee.email,
      createdDate: new Date(),
      lastSentDate: new Date(),
    });

    const link = `${this.frontendURL}/recuperar-senha/${generateCode}/${employee.email}`;

    await this.mailerService.sendMail({
      to: email,
      from: '"EMP Soluções" <no-reply@empsolucoes.site>',
      subject: 'Recuperação de senha - EMP Soluções',
      html: `<h4 style="font-weight: 400;">Clique <a href="${link}">neste link</a> para fazer a recuperação da sua senha</h3>`,
    });
  }

  async recoverPassword(
    code: string,
    email: string,
    dto: RecoverPasswordByEmailDto,
  ): Promise<void> {
    const { confirmPassword, newPassword } = dto;

    const employee = await this.employeeModel.findOne().where({
      email,
    });

    if (!employee?.toObject()) {
      throw new NotFoundException('Credenciais inválidas.');
    }

    const existentCode = await this.codeModel.findOne({
      employeeId: employee.id,
    });

    if (!existentCode) {
      throw new ConflictException('Código expirado ou inválido.');
    }

    const tenMinutesAgo = dayjs().subtract(10, 'minutes');
    const codeCreatedTime = dayjs(new Date(existentCode.createdDate));

    if (codeCreatedTime.isBefore(tenMinutesAgo)) {
      await this.codeModel.deleteOne({
        _id: existentCode.id,
      });
      throw new NotFoundException('Código expirado ou inválido.');
    }

    if (code !== existentCode.code) {
      throw new ConflictException('Código expirado ou inválido.');
    }

    if (newPassword !== confirmPassword) {
      throw new BadRequestException('As senhas devem ser iguais');
    }

    await this.employeeModel.updateOne(
      {
        _id: existentCode.employeeId,
      },
      {
        passwordHash: await hash(newPassword, 6),
      },
    );
    await this.codeModel.deleteOne({
      _id: existentCode.id,
    });
  }
}
