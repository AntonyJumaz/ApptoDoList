import { Test, TestingModule } from '@nestjs/testing';
import { TasksController } from './tasks.controller';
import { TasksService } from './tasks.service';
import {  CreateTaskDTO, GetTasksDTO,TaskDTOStub } from './dto/taks.dto';
import { GetTaskStub, Task, userStub } from './interface/task.interface';
import { getModelToken } from '@nestjs/mongoose';
import { TaskDocument, TaskMongo } from './schemas/tasks.schema';
import { Body, HttpStatus, Res } from '@nestjs/common';
describe('TasksController', () => {
  let controllerTask: TasksController;
  let serviceTask: TasksService;
  let fakeTasksService: Partial<TasksService>;
  let date= new Date("2022-08-11T17:56:25.005Z");

  beforeEach(async () => {
    fakeTasksService = {
      getAll(): Promise<TaskDocument[]> {
        return Promise.resolve([userStub()] as unknown as TaskDocument[]);
      },
     create(task: CreateTaskDTO): Promise<TaskDocument> {
      return Promise.resolve([userStub()] as unknown as TaskDocument);
    },
      // remove: () => {},
      // update: () => {},
    };
    const taskmodule: TestingModule = await Test.createTestingModule({
      controllers: [TasksController],
      providers: [{provide:TasksService, useValue:fakeTasksService}],
    }).compile();

    serviceTask = taskmodule.get<TasksService>(TasksService);
    controllerTask = taskmodule.get<TasksController>(TasksController);
  });


  describe('getAll', () => {
    describe('when getAll is called', () => {
      let tasks: Task[];

      beforeEach(async () => {
        tasks = await controllerTask.getAll();
      })
      test('then it should return users', () => {
        expect(tasks).toEqual([userStub()])
      })

      
    })
  })
  describe('create', () => {
    describe('when create is called', () => {
      let createUserDto: CreateTaskDTO;
      let task: TaskMongo;

      beforeEach(async () => {
        createUserDto = {
          title: userStub().title,
          description:userStub().description,
          status:userStub().status,
          date:userStub().date,
        }
        task = await controllerTask.create(HttpStatus.OK,createUserDto);
      })
      test('then it should return a user', () => {
        expect(task).toEqual(userStub())
      })
    })
  })
});
