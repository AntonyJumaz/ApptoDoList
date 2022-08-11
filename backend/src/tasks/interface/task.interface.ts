import { Types } from 'mongoose';
import { GetTasksDTO } from '../dto/taks.dto';
export interface Task {
    _id: Types.ObjectId;
    title: string;
    description?: string;
    status: string;
    date: Date;
  }

export interface mockUpGetTask{
  
}

export const GetTaskStub: GetTasksDTO[] = [
  {
  limit: 10,
  offset: 10,
  }
]


import { TaskMongo } from "../schemas/tasks.schema";

export const userStub = (): TaskMongo => {
 return {
    _id: new Types.ObjectId("62f543b94e2a23963ef7dbe4"),
    title: 'test@example.com',
    description: "jjj",
    status:  "pending",
    date:new Date("2022-08-11T17:59:09.998Z"),
  }
}