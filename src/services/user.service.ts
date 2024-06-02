import { CreateUser, UpdateUser } from "./interfaces/user.interface";
import { injectable } from "inversify";
import { User } from "../models/user.entity";

@injectable()
class UserService {
  constructor() {}
  findAll() {
    return [
      {
        id: 1,
        title: "first todo",
        content: "a task to execute",
      },
      {
        id: 2,
        title: "second todo",
        content: "another task to execute",
      },
    ];
  }

  findOne(email: string) {
    const infofake = [
      {
        name: "bryan",
        email: "test1@example.com",
      },
      {
        name: "bryan2",
        email: "test2@example.com",
      },
    ];

    return infofake.find((todo) => todo.email === email);
  }

  create(create: CreateUser) {
    return create;
    // Lógica para crear una suscripcion
  }

  update(id: number, update: UpdateUser) {
    return {
      id: id,
      ...update,
    };
  }

  delete(id: number) {
    return {
      id: id,
      message: "deleted",
    };
  }
}

export default UserService;
