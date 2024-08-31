import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({
  timestamps: true,
})
export class Feedback extends Document {
  @Prop({ type: String, required: true })
  enterpriseId: string;

  @Prop({ type: String, required: true })
  sector: string;

  @Prop({ type: [Number], required: true })
  rating: number[];

  @Prop({ type: String, required: false })
  comment?: string;

  createdAt: Date;
}

export const FeedbackSchema = SchemaFactory.createForClass(Feedback);
