import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { TaskDocument } from './schemas/tasks.schema';
import { Model, Types } from 'mongoose';
import { CreateTaskDTO, GetTaskDTO, GetTasksDTO } from './dto/taks.dto';
import { Task } from './interface/task.interface';

@Injectable()
export class TasksService {
    constructor(
        @InjectModel('Task') private TaskModel: Model<TaskDocument>,
      ) {}
      async getAll(): Promise<TaskDocument[]> {
        return await this.TaskModel.find()
      }
      async getbyStatus(queryOptions: GetTasksDTO,status:string, pageSize:number, page:number): Promise<TaskDocument[]> {
        const take= pageSize || 3
        const pages=page || 1;
        const skip= (pages-1) * take ;
        return await this.TaskModel
        .find({status}).limit(pageSize).skip(skip)
      }

      async create(task: CreateTaskDTO): Promise<TaskDocument> {
        const createdTask = await this.TaskModel.create({
          ...task,
        });
        return createdTask;
      }

      async delete(productID: Types.ObjectId): Promise<any> {
        const deletedTask = await this.TaskModel.findByIdAndDelete(productID);
        return deletedTask;
      }

      async update(id: string, createTaskDTO:CreateTaskDTO): Promise<TaskDocument>{
        const updatedTask= await this.TaskModel.findByIdAndUpdate(id,createTaskDTO, {new:true});
        return updatedTask;
      }
      
}
