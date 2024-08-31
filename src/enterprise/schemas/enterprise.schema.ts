import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({
  timestamps: true,
})
export class Enterprise extends Document {
  @Prop({ type: String, required: true })
  name: string;

  @Prop({ type: String, required: true, unique: true })
  document: string;

  createdAt: Date;
  updatedAt: Date;
}

export const EnterpriseSchema = SchemaFactory.createForClass(Enterprise);
