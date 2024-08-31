import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { EmployeeService } from './employee.service';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { CreateEmployeeDto } from './dto/create-employee-dto';
import { EmployeeDto } from './dto/employee-dto';
import { CurrentUser } from '../auth/current-user-decorator';
import { UserPayload } from '../auth/jtw.strategy';
import { UpdateEmployeeDto } from './dto/update-employee-dto';

@Controller('colaborador')
@ApiTags('colaborador')
export class EmployeeController {
  constructor(private employeeService: EmployeeService) {}

  @Get()
  @ApiResponse({
    status: 200,
    type: [EmployeeDto],
    description: 'Listagem de Colaboradores',
  })
  findAll(@CurrentUser() currentUser: UserPayload): Promise<EmployeeDto[]> {
    return this.employeeService.findAll(currentUser);
  }

  @Get('perfil')
  @ApiResponse({
    status: 200,
    type: EmployeeDto,
    description: 'Obter Colaborador atual',
  })
  getCurrentUser(
    @CurrentUser() currentUser: UserPayload,
  ): Promise<EmployeeDto> {
    return this.employeeService.getCurrentUser(currentUser);
  }

  @Get(':id')
  @ApiResponse({
    status: 200,
    type: EmployeeDto,
    description: 'Obter Colaborador por ID',
  })
  getById(
    @Param('id') id: string,
    @CurrentUser() currentUser: UserPayload,
  ): Promise<EmployeeDto> {
    return this.employeeService.getById(id, currentUser);
  }

  @Post()
  @HttpCode(201)
  @ApiResponse({
    status: 201,
    description: 'Criação de Colaboradores',
  })
  create(
    @Body() dto: CreateEmployeeDto,
    @CurrentUser() currentUser: UserPayload,
  ): Promise<void> {
    return this.employeeService.create(dto, currentUser);
  }

  @Put(':id')
  @HttpCode(204)
  @ApiResponse({
    status: 204,
    description: 'Atualização dos dados de Colaborador',
  })
  update(
    @Param('id') id: string,
    @Body() dto: UpdateEmployeeDto,
    @CurrentUser() currentUser: UserPayload,
  ): Promise<void> {
    return this.employeeService.update(id, dto, currentUser);
  }

  @Delete(':id')
  @HttpCode(204)
  @ApiResponse({
    status: 204,
    description: 'Deleção de Colaborador',
  })
  deleteEmployee(
    @Param('id') id: string,
    @CurrentUser() currentUser: UserPayload,
  ): Promise<void> {
    return this.employeeService.delete(id, currentUser);
  }
}
