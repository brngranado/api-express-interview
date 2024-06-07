import * as express from "express";
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
import { TYPES } from "../controllers/types";
import { TaskDto } from "./dto/task.dto";
import TaskService from "../services/task.service";
import { UseAuthMiddleware } from "./middleware/auth.middleware";

@controller("/tasks")
export default class TaskController extends BaseHttpController {
  constructor(
    @inject(TYPES.TaskService)
    private taskService: TaskService
  ) {
    super();
  }

  @Post("/")
  @UseAuthMiddleware()
  public async create(@request() req: express.Request, @Body() body: TaskDto) {
    const task = this.taskService.create(body);
    return task;
  }

  @Get("/")
  @UseAuthMiddleware()
  public async findAll() {
    const tasks = this.taskService.findAll();
    return tasks;
  }

  @Get("/:id")
  @UseAuthMiddleware()
  public async findOne(@request() req: express.Request) {
    const { id } = req.params;
    const task = this.taskService.findOne(id);
    return task;
  }

  @Put("/:id")
  @UseAuthMiddleware()
  public async update(@request() req: express.Request, @Body() body: TaskDto) {
    const { id } = req.params;
    const task = this.taskService.update(id, body);
    return task;
  }

  @Delete("/:id")
  @UseAuthMiddleware()
  public async delete(@request() req: express.Request) {
    const { id } = req.params;
    const task = this.taskService.delete(id);
    return task;
  }
}
