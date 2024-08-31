import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { EmployeeController } from './employee.controller';
import { EmployeeService } from './employee.service';
import { AuthModule } from '../auth/auth.module';
import { EmployeeSchema } from './schemas/employee.schema';
import { MailerModule } from '@nestjs-modules/mailer';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { EnvService } from '../env/env.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: 'Employee',
        schema: EmployeeSchema,
      },
    ]),
    MailerModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        transport: {
          host: configService.get('EMAIL_SENDER_HOST'),
          secure: false,
          port: configService.get('MAIL_SENDER_PORT'),
          auth: {
            user: configService.get('EMAIL_SENDER_USER'),
            pass: configService.get('EMAIL_SENDER_PASSWORD'),
          },
          ignoreTLS: true,
        },
        defaults: {
          from: '"EMP Soluções" <no-reply@empsolucoes.site>',
        },
      }),
      inject: [ConfigService],
    }),
    AuthModule,
  ],
  controllers: [EmployeeController],
  providers: [EmployeeService, EnvService],
})
export class EmployeeModule {}
