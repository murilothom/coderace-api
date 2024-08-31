import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({
  timestamps: true,
})
export class Question extends Document {
  @Prop({ type: String, required: true })
  question: string;

  @Prop({ type: String, required: true })
  journey: 'inicio' | 'fim';
}

export const QuestionSchema = SchemaFactory.createForClass(Question);
