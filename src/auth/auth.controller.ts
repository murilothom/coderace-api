import {
  Body,
  Controller,
  HttpCode,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { Public } from '../auth/public';
import { AuthenticateUserDto } from './dto/authenticate-user-dto';
import { LoginDto } from './dto/login-dto';
import { AuthService } from './auth.service';
import { RecoverPasswordByEmailDto } from './dto/recover-email-password-by-email-dto';

@Controller('autenticacao')
@ApiTags('autenticacao')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Public()
  @Post()
  @HttpCode(200)
  @ApiResponse({
    status: 200,
    type: AuthenticateUserDto,
    description: 'Autenticação',
  })
  authenticate(@Body() dto: LoginDto): Promise<AuthenticateUserDto> {
    return this.authService.authenticate(dto);
  }

  @Public()
  @Post('/recuperar-senha/:email')
  @HttpCode(201)
  @ApiResponse({
    status: 201,
    description:
      'Gera o código e enviar para o e-mail do usuário para fazer a recuperação',
  })
  generateCodeToRecoverPassword(@Param('email') email: string): Promise<void> {
    return this.authService.generateCodeToRecoverPassword(email);
  }

  @Public()
  @Patch('/recuperar-senha/:email')
  @HttpCode(204)
  @ApiResponse({
    status: 204,
    description: 'Valida o código e faz a troca da senha',
  })
  recoverPassword(
    @Query('code') code: string,
    @Param('email') email: string,
    @Body() dto: RecoverPasswordByEmailDto,
  ): Promise<void> {
    return this.authService.recoverPassword(code, email, dto);
  }
}
