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

@Injectable()
export class FeedbackService {
  constructor(
    @InjectModel(Employee.name)
    private readonly employeeModel: Model<Employee>,
    @InjectModel(Enterprise.name)
    private readonly enterpriseModel: Model<Enterprise>,
    @InjectModel(Feedback.name)
    private readonly feedbackModel: Model<Feedback>,
  ) {}

  async getAll(currentUser: UserPayload): Promise<FeedbackDto[]> {
    const enterpriseId = await this.validatePermissionAndGetEnterpriseId(
      currentUser.sub,
    );

    const feedbacks = await this.feedbackModel.find({
      enterpriseId,
    });

    if (!feedbacks?.length) {
      return [];
    }
    // TODO: Enviar dados para a IA

    return [];
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
      rating: dto.rating,
      comment: dto.comment,
    });
  }

  private async validatePermissionAndGetEnterpriseId(
    id: string,
  ): Promise<string> {
    const employee = await this.employeeModel.findOne({
      _id: id,
      role: Role.ADMIN,
    });

    const enterprise = await this.enterpriseModel.findById(id);

    if (!employee?.toObject() && !enterprise?.toObject()) {
      throw new ForbiddenException('Sem permissão.');
    }

    return employee?.enterpriseId || enterprise?.id;
  }
}
