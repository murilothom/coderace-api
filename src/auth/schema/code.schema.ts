import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({
  timestamps: true,
})
export class Code extends Document {
  @Prop({ type: String, required: true })
  code: string;

  @Prop({ type: String, required: true, unique: true })
  email: string;

  @Prop({ type: String, required: true, unique: true })
  employeeId: string;

  @Prop({ type: Date, required: true })
  createdDate: Date;

  @Prop({ type: Date, required: true })
  lastSentDate: Date;
}

export const CodeSchema = SchemaFactory.createForClass(Code);
