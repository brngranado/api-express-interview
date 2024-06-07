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
  Middleware,
} from "inversify-express-utils";
import UserService from "../services/user.service";
import { TYPES } from "../controllers/types";
import { UserDto } from "./dto/user.dto";
import { UseAuthMiddleware } from "./middleware/auth.middleware";

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
  @UseAuthMiddleware()
  public async findAll() {
    const users = this.userService.findAll();
    return users;
  }

  @Get("/:email")
  @UseAuthMiddleware()
  public async findOne(@request() req: express.Request) {
    const { email } = req.params;
    const user = this.userService.findOne(email);

    return this.json(user, 200);
  }

  @Put("/:id")
  @UseAuthMiddleware()
  public async update(@request() req: express.Request, @Body() body: UserDto) {
    const { id } = req.params;
    const user = this.userService.update(id, body);
    return user;
  }

  @Delete("/:id")
  @UseAuthMiddleware()
  public async delete(@request() req: express.Request) {
    const { id } = req.params;
    const user = this.userService.delete(id);
    return user;
  }
}
