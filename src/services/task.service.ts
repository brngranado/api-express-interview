import { CreateUser, UpdateUser } from "./interfaces/user.interface";
import { injectable } from "inversify";
import { Task } from "../models/task.entity";
import { CreateTask, UpdateTask } from "./interfaces/task.interface";

@injectable()
class TaskService {
  constructor() {}
  findAll() {
    return [
      {
        id: 1,
        title: "first task",
        content: "a task to execute",
      },
      {
        id: 2,
        title: "second task",
        content: "another task to execute",
      },
    ];
  }

  findOne(id: number) {
    console.log("llega a get servicio", id);
    const infofake = [
      {
        id: 1,
        title: "first task",
        content: "a task to execute",
      },
      {
        id: 2,
        title: "second task",
        content: "another task to execute",
      },
    ];

    return infofake.find((todo) => +todo.id === +id);
  }

  create(create: CreateTask) {
    return create;
    // Lógica para crear una suscripcion
  }

  update(id: number, update: UpdateTask) {
    return {
      id: id,
      ...update,
    };
  }

  delete(id: number) {
    return {
      id: id,
      message: "deleted task",
    };
  }
}

export default TaskService;
