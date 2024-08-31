import { Controller, Get, HttpCode, Post } from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { CurrentUser } from '../auth/current-user-decorator';
import { UserPayload } from '../auth/jtw.strategy';
import { RecordTimeService } from './record-time.service';

@Controller('registro-ponto')
@ApiTags('registro-ponto')
export class RecordTimeController {
  constructor(private recordTimeService: RecordTimeService) {}

  @Get('hoje')
  @HttpCode(200)
  @ApiResponse({
    status: 200,
    type: Number,
    description: 'Obter pontos de hoje',
  })
  getAllToday(@CurrentUser() currentUser: UserPayload): Promise<number> {
    return this.recordTimeService.getAllToday(currentUser);
  }

  @Post()
  @HttpCode(201)
  @ApiResponse({
    status: 201,

    description: 'Registro de ponto',
  })
  register(@CurrentUser() currentUser: UserPayload): Promise<void> {
    return this.recordTimeService.register(currentUser);
  }
}
