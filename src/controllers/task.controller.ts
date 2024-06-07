import { Request, Response } from "express";
import { injectable, inject } from "inversify";
import {
  interfaces,
  controller,
  httpGet as Get,
  httpPost as Post,
  httpPut as Put,
  httpDelete as Delete,
  request,
  requestBody as Body,
  queryParam,
  response,
  requestParam,
  BaseHttpController,
} from "inversify-express-utils";
import UserService from "../services/user.service";
import { TYPES } from "../controllers/types";
import { TaskDto } from "./dto/task.dto";
import TaskService from "../services/task.service";

@controller("/tasks")
export default class TaskController extends BaseHttpController {
  constructor(
    @inject(TYPES.TaskService)
    private taskService: TaskService
  ) {
    super();
  }

  @Post("/")
  public async create(@Body() body: TaskDto) {
    const task = this.taskService.create(body);
    return task;
  }

  @Get("/")
  public async findAll() {
    const tasks = this.taskService.findAll();
    return tasks;
  }

  @Get("/:id")
  public async findOne(@requestParam("id") id: string) {
    const task = this.taskService.findOne(id);
    return task;
  }

  @Put("/:id")
  public async update(@requestParam("id") id: string, @Body() body: TaskDto) {
    const task = this.taskService.update(id, body);
    return task;
  }

  @Delete("/:id")
  public async delete(@requestParam("id") id: string) {
    const task = this.taskService.delete(id);
    return task;
  }
}
