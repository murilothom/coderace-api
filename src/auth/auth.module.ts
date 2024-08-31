import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from './jtw.strategy';
import { APP_GUARD } from '@nestjs/core';
import { JwtAuthGuard } from './jwt-auth.guard';
import { EnvModule } from '../env/env.module';
import { EnvService } from '../env/env.service';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { MongooseModule } from '@nestjs/mongoose';
import { MailerModule } from '@nestjs-modules/mailer';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { EmployeeSchema } from '../employee/schemas/employee.schema';

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
    JwtModule.registerAsync({
      imports: [EnvModule],
      inject: [EnvService],
      global: true,
      async useFactory(envService: EnvService) {
        const privateKey = envService.get('JWT_PRIVATE_KEY');
        const publicKey = envService.get('JWT_PUBLIC_KEY');

        return {
          signOptions: { algorithm: 'RS256' },
          privateKey: Buffer.from(privateKey, 'base64'),
          publicKey: Buffer.from(publicKey, 'base64'),
        };
      },
    }),
    PassportModule,
  ],
  providers: [
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
    EnvService,
    JwtStrategy,
    AuthService,
  ],
  controllers: [AuthController],
})
export class AuthModule {}
