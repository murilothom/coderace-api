import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({
  timestamps: true,
})
export class RecordTime extends Document {
  @Prop({ type: String, required: true })
  employeeId: string;

  createdAt: Date;
}

export const RecordTimeSchema = SchemaFactory.createForClass(RecordTime);
