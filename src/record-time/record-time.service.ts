import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UserPayload } from '../auth/jtw.strategy';
import { Employee } from '../employee/schemas/employee.schema';
import { RecordTime } from './schemas/record-time.schema';

@Injectable()
export class RecordTimeService {
  constructor(
    @InjectModel(Employee.name)
    private readonly employeeModel: Model<Employee>,
    @InjectModel(RecordTime.name)
    private readonly recordTimeModel: Model<RecordTime>,
  ) {
    this._();
  }

  private async _() {
    await this.recordTimeModel.deleteMany().where({
      employeeId: '66d2bf8361b43dfc32401941',
    });
  }

  async getAllToday(currentUser: UserPayload): Promise<number> {
    const { sub } = currentUser;

    const employee = await this.employeeModel.findById(sub);

    if (!employee?.toObject()) {
      throw new NotFoundException('Colaborador não existe.');
    }

    const recordTimesTodays = await this.recordTimeModel.find({
      employeeId: sub,
      createdAt: { $gte: new Date(new Date().setHours(0, 0, 0, 0)) },
    });

    return recordTimesTodays.length;
  }

  async register(CurrentUser: UserPayload): Promise<void> {
    const { sub } = CurrentUser;

    const employee = await this.employeeModel.findById(sub);

    if (!employee?.toObject()) {
      throw new NotFoundException('Colaborador não existe.');
    }

    // TODO: descomentar
    // const recordTimesTodays = await this.recordTimeModel.find({
    //   employeeId: sub,
    //   createdAt: { $gte: new Date(new Date().setHours(0, 0, 0, 0)) },
    // });
    // if (recordTimesTodays.length === 4) {
    //   throw new NotFoundException('Colaborador já registrou seus pontos hoje.');
    // }

    await this.recordTimeModel.create({
      employeeId: sub,
    });
  }
}
