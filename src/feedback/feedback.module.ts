import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from '../auth/auth.module';
import { EmployeeSchema } from '../employee/schemas/employee.schema';
import { FeedbackSchema } from './schemas/feedback.schema';
import { FeedbackController } from './feedback.controller';
import { FeedbackService } from './feedback.service';
import { EnterpriseSchema } from '../enterprise/schemas/enterprise.schema';
import { QuestionSchema } from './schemas/question.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: 'Feedback',
        schema: FeedbackSchema,
      },
      {
        name: 'Question',
        schema: QuestionSchema,
      },
      {
        name: 'Employee',
        schema: EmployeeSchema,
      },
      {
        name: 'Enterprise',
        schema: EnterpriseSchema,
      },
    ]),
    AuthModule,
  ],
  controllers: [FeedbackController],
  providers: [FeedbackService],
})
export class FeedbackModule {}
