import { Controller,Get,Post,Put,Delete, Body, Query, Patch, Param, NotFoundException, Res, HttpStatus } from '@nestjs/common';
import {  CreateTaskDTO, GetTasksDTO } from './dto/taks.dto';
import { TaskDocument } from './schemas/tasks.schema';
import { TasksService } from './tasks.service';

@Controller('task')
export class TasksController {
  constructor(private readonly taskService: TasksService) {}

  @Get('/get')
  async getAll(@Body() getTasksDTO: GetTasksDTO): Promise<TaskDocument[]> {
    return await this.taskService.getAll(getTasksDTO);
  }
  @Post('/create')
  async create(@Res() res, @Body() createTaskDTO: CreateTaskDTO): Promise<TaskDocument> {
    const createdTask= await this.taskService.create(createTaskDTO);
    return res.status(HttpStatus.OK).json({
      message: 'Product Successfully Created',
      createdTask
  });
  }
  @Get()
  async findAllStatus(@Res() res,@Body() getTasksDTO: GetTasksDTO, @Query('status') status:string, @Query('pageSize') pageSize:number, @Query('page') page:number): Promise<TaskDocument[]> {
    const allStatus=await this.taskService.getbyStatus(getTasksDTO,status,pageSize,page);
    return res.status(HttpStatus.OK).json(allStatus);
  }

  @Put('/update')
  async updateUser(@Res() res, @Body() createTaskDTO: CreateTaskDTO, @Query('_id') _id){
    const updatedTask= await this.taskService.update(_id, createTaskDTO);
    if (!updatedTask) throw new NotFoundException('Product does not exist!');
    return res.status(HttpStatus.OK).json({
      message: 'Task Updated Successfully',
      updatedTask 
  });
  }
  
  @Delete('/delete')
  async deleteProduct(@Res() res, @Query('_id') _id) {
      const TaskDeleted = await this.taskService.delete(_id);
      if (!TaskDeleted) throw new NotFoundException('Task does not exist!');
      return res.status(HttpStatus.OK).json({
          message: 'Task Deleted Successfully',
          TaskDeleted
      });
  }
}
