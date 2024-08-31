import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from '../auth/auth.module';
import { EmployeeSchema } from '../employee/schemas/employee.schema';
import { RecordTimeSchema } from './schemas/record-time.schema';
import { RecordTimeService } from './record-time.service';
import { RecordTimeController } from './record-time.controller';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: 'RecordTime',
        schema: RecordTimeSchema,
      },
    ]),
    MongooseModule.forFeature([
      {
        name: 'Employee',
        schema: EmployeeSchema,
      },
    ]),
    AuthModule,
  ],
  controllers: [RecordTimeController],
  providers: [RecordTimeService],
})
export class RegisterTimeModule {}
