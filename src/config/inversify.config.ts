import { Container } from "inversify";
import { TYPES } from "../controllers/types";
import UserController from "../controllers/user.controller";
import UserService from "../services/user.service";
import TaskController from "../controllers/task.controller";
import TaskService from "../services/task.service";
import { FirestoreDb } from "./db.config";
import { AuthController } from "../controllers/auth.controller";
import { AuthService } from "../services/auth.service";
import { AuthMiddleware } from "../controllers/middleware/auth.middleware";
import { BaseMiddleware } from "inversify-express-utils";

const container = new Container();

container.bind<UserController>(TYPES.UserController).to(UserController);
container.bind<TaskController>(TYPES.TaskController).to(TaskController);
container.bind<AuthController>(TYPES.AuthController).to(AuthController);
container.bind<UserService>(TYPES.UserService).to(UserService);
container.bind<TaskService>(TYPES.TaskService).to(TaskService);
container.bind<AuthService>(TYPES.AuthService).to(AuthService);
container.bind<BaseMiddleware>(TYPES.AuthMiddleware).to(AuthMiddleware);
container.bind<FirestoreDb>(TYPES.FirestoreDb).to(FirestoreDb);

export { container };
