import { Body, Controller, HttpCode, Post } from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { Public } from '../auth/public';
import { AuthenticateUserDto } from './dto/authenticate-user-dto';
import { LoginDto } from './dto/login-dto';
import { AuthService } from './auth.service';

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
}
