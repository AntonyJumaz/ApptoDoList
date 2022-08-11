import { Types } from 'mongoose';
export interface Task {
    _id: Types.ObjectId;
    title: string;
    description?: string;
    status: string;
    date: Date;
  }

export interface mockUpTask{
  
}
  