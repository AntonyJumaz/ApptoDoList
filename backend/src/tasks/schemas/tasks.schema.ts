import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Task } from '../interface/task.interface';
import { Document, Schema as SchemaMongoose, Types } from 'mongoose';

@Schema()
export class TaskMongo implements Task {
  _id: Types.ObjectId;
  @Prop({ type: String, required: true, minlength:10, maxlength:120})
  title: string;
  @Prop({ type: String, required: true, minlength:100, maxlength:1000})
  description: string;
  @Prop({ type: String, required: true })
  status: string;
  @Prop({ type: Date, required: false })
  date: Date;
}

export type TaskDocument = TaskMongo & Document;

export const TaskSchema = SchemaFactory.createForClass(TaskMongo);
