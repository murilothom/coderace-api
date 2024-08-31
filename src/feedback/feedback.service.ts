import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UserPayload } from '../auth/jtw.strategy';
import { Employee, Role } from '../employee/schemas/employee.schema';
import { Feedback } from './schemas/feedback.schema';
import { CreateFeedbackDto } from './dto/create-feedback-dto';
import { Enterprise } from '../enterprise/schemas/enterprise.schema';
import { FeedbackDto } from './dto/feedback-dto';
import { QuestionDto } from './dto/question-dto';
import { Question } from './schemas/question.schema';
import {
  getThreeRandomQuestions,
  questionsAfterWorkObjects,
  questionsBeforeWorkObjects,
} from './utils/questions';

@Injectable()
export class FeedbackService {
  constructor(
    @InjectModel(Employee.name)
    private readonly employeeModel: Model<Employee>,
    @InjectModel(Enterprise.name)
    private readonly enterpriseModel: Model<Enterprise>,
    @InjectModel(Question.name)
    private readonly questionModel: Model<Question>,
    @InjectModel(Feedback.name)
    private readonly feedbackModel: Model<Feedback>,
  ) {
    this.populateQuestions();
  }

  private async populateQuestions() {
    const questions = await this.questionModel.find();

    if (questions.length) {
      return;
    }

    await this.questionModel.insertMany([
      ...questionsAfterWorkObjects,
      ...questionsBeforeWorkObjects,
    ]);
  }

  async getRandomQuestions(): Promise<QuestionDto[]> {
    const start = await this.questionModel
      .find({ journey: 'inicio' })
      .then((lst) =>
        lst.map((x) => ({
          id: x.id,
          question: x.question,
          journey: x.journey,
        })),
      );
    const final = await this.questionModel
      .find({ journey: 'fim' })
      .then((lst) =>
        lst.map((x) => ({
          id: x.id,
          question: x.question,
          journey: x.journey,
        })),
      );

    const startQuestions = getThreeRandomQuestions(start);
    const finalQuestions = getThreeRandomQuestions(final);

    return [...startQuestions, ...finalQuestions];
  }

  async create(
    dto: CreateFeedbackDto,
    currentUser: UserPayload,
  ): Promise<void> {
    const { sub } = currentUser;

    const employee = await this.employeeModel.findById(sub);

    if (!employee?.toObject()) {
      throw new NotFoundException('Colaborador não existe.');
    }

    await this.feedbackModel.create({
      enterpriseId: employee.enterpriseId,
      sector: employee.sector,
      answers: dto.answers,
    });
  }

  private async validatePermissionAndGetEnterpriseId(
    id: string,
  ): Promise<string> {
    const employee = await this.employeeModel.findById(id);

    if (
      !employee?.toObject() ||
      (employee.role !== Role.ADMIN && employee.role !== Role.OWNER)
    ) {
      throw new ForbiddenException('Sem permissão.');
    }

    return employee.enterpriseId;
  }
}
