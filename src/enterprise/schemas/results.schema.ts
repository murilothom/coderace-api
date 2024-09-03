import { Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export class Results extends Document {
  @Prop({ type: String, required: true })
  sector: string;

  @Prop({ type: Object, required: true })
  results: string;

  @Prop({ type: Object, required: true })
  responses: Date;
}

export const ResultsSchema = SchemaFactory.createForClass(Results);
