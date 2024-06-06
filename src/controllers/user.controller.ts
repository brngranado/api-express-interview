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
import { UserDto } from "./dto/user.dto";

@controller("/users")
export default class UserController extends BaseHttpController {
  constructor(
    @inject(TYPES.UserService)
    private userService: UserService
  ) {
    super();
  }

  @Post("/")
  public async create(@Body() req: UserDto) {
    const body = req;
    const user = this.userService.create(body);
    return user;
  }

  @Get("/")
  public async findAll() {
    const users = this.userService.findAll();
    return users;
  }

  @Get("/:email")
  public async findOne(@requestParam("email") email: string) {
    const user = this.userService.findOne(email);
    return user;
  }

  @Put("/:id")
  public async update(@requestParam("id") id: number, @Body() body: UserDto) {
    const user = this.userService.update(id, body);
    return user;
  }

  @Delete("/:id")
  public async delete(@requestParam("id") id: string) {
    const user = this.userService.delete(id);
    return user;
  }
}
