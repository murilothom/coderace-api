import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { EnterpriseController } from './enterprise.controller';
import { EnterpriseService } from './enterprise.service';
import { AuthModule } from '../auth/auth.module';
import { EnterpriseSchema } from './schemas/enterprise.schema';
import { EmployeeSchema } from '../employee/schemas/employee.schema';
import { ResultsSchema } from './schemas/results.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: 'Enterprise',
        schema: EnterpriseSchema,
      },
      {
        name: 'Employee',
        schema: EmployeeSchema,
      },
      {
        name: 'Employee',
        schema: EmployeeSchema,
      },
      {
        name: 'Results',
        schema: ResultsSchema,
      },
    ]),
    AuthModule,
  ],
  controllers: [EnterpriseController],
  providers: [EnterpriseService],
})
export class EnterpriseModule {}
