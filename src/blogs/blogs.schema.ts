import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Blog {
  @Prop()
  title: string;

  @Prop()
  content: string;
}

export type BlogDocument = Blog & Document;
export const BlogSchema = SchemaFactory.createForClass(Blog);