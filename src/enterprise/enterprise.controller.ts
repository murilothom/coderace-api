import { Body, Controller, Get, HttpCode, Param, Post } from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { CreateEnterpriseDto } from './dto/create-enterprise-dto';
import { EnterpriseDto } from './dto/enterprise-dto';
import { CurrentUser } from '../auth/current-user-decorator';
import { UserPayload } from '../auth/jtw.strategy';
import { EnterpriseService } from './enterprise.service';
import { Public } from '../auth/public';
import { SectorDto } from './dto/sector-dto';

@Controller('empresa')
@ApiTags('empresa')
export class EnterpriseController {
  constructor(private enterpriseService: EnterpriseService) {}

  @Get()
  @ApiResponse({
    status: 200,
    type: EnterpriseDto,
    description: 'Obter Empresa atual',
  })
  getCurrentEnterprise(
    @CurrentUser() currentUser: UserPayload,
  ): Promise<EnterpriseDto> {
    return this.enterpriseService.getCurrentEnterprise(currentUser);
  }

  @Get('setores')
  @ApiResponse({
    status: 200,
  })
  getEnterpriseSectors(
    @CurrentUser() currentUser: UserPayload,
  ): Promise<SectorDto[]> {
    return this.enterpriseService.getEnterpriseSectors(currentUser);
  }

  @Get('setores/:setor/insight')
  @ApiResponse({
    status: 200,
  })
  getSectorInsight(
    @Param('setor') setor: string,
    @CurrentUser() currentUser: UserPayload,
  ): Promise<any> {
    return this.enterpriseService.getSectorInsight(setor, currentUser);
  }

  @Public()
  @Post()
  @HttpCode(201)
  @ApiResponse({
    status: 201,
    description: 'Criação de Empresas',
  })
  create(@Body() dto: CreateEnterpriseDto): Promise<void> {
    return this.enterpriseService.create(dto);
  }
}
