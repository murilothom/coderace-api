import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

class Answer extends Document {
  @Prop({ type: String, required: true })
  questionId: string;

  @Prop({ type: Number, required: true })
  rate: number;
}

@Schema({
  timestamps: true,
})
export class Feedback extends Document {
  @Prop({ type: String, required: true })
  enterpriseId: string;

  @Prop({ type: String, required: true })
  sector: string;

  @Prop({ type: [Answer], required: true })
  answers: Answer[];

  createdAt: Date;
}

export const FeedbackSchema = SchemaFactory.createForClass(Feedback);
