import { Container } from "inversify";
import { TYPES } from "../controllers/types";
import UserController from "../controllers/user.controller";
import UserService from "../services/user.service";
import TaskController from "../controllers/task.controller";
import TaskService from "../services/task.service";

const container = new Container();

container.bind<UserController>(TYPES.UserController).to(UserController);
container.bind<TaskController>(TYPES.TaskController).to(TaskController);
container.bind<UserService>(TYPES.UserService).to(UserService);
container.bind<TaskService>(TYPES.TaskService).to(TaskService);

export { container };
