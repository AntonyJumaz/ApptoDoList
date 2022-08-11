import { Types } from 'mongoose';
import {IsNotEmpty, isNotEmpty, IsOptional, IsString, MaxLength, MinLength} from 'class-validator'

export class TaskDTOStub{
    title: "Task-5";
    description: "Cumplir con todos los requisitos del programa-1Cumplir con todos los requisitos del programa-1Cumplir con todos los requisitos del programa-1Cumplir con todos los requisitos del programa-1Cumplir con todos los requisitos del programa-1Cumplir con todos los requisitos del programa-1Cumplir con todos los requisitos del programa-1Cumplir con todos los requisitos del programa-1Cumplir con todos los requisitos del programa-1Cumplir con todos los requisitos del programa-4";
    status: "pending";
};

export class CreateTaskDTO {
  @MaxLength(120)
  @MinLength(10)
  @IsNotEmpty()
  @IsString()
    readonly title: string;
  @MaxLength(1000)
  @MinLength(120)
  @IsNotEmpty()
  @IsString()
    readonly description: string;
  @IsString()
    readonly status: string;
  @IsOptional()
  @IsString()
    readonly date: Date;
}

export interface GetTaskDTO {
  _id?: Types.ObjectId;
  title?: string;
  description?: string;
  status?: string;
  date?: Date;
}

export interface GetTasksDTO {
  limit?: number;
  offset?: number;
}
export class UpdateTaskDto{
  @MaxLength(120)
  @MinLength(10)
  @IsNotEmpty()
  @IsString()
  title:string;
  @MaxLength(1000)
  @MinLength(120)
  @IsNotEmpty()
  @IsString()
  description:string;

  @IsString()
  status:string;

  @IsOptional()
  @IsString()
  date:string;
}