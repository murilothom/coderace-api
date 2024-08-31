import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export enum Role {
  ADMIN = 'admin',
  EMPLOYEE = 'employee',
}

@Schema({
  timestamps: true,
})
export class Employee extends Document {
  @Prop({ type: String, required: true })
  name: string;

  @Prop({ type: String, required: true, unique: true })
  email: string;

  @Prop({ type: String, required: true })
  passwordHash: string;

  @Prop({ type: String, required: true })
  sector: string;

  @Prop({ enum: Role, required: true })
  role: Role;
}

export const EmployeeSchema = SchemaFactory.createForClass(Employee);
