import { inject } from "inversify";
import {
  controller,
  httpPost as Post,
  requestBody as Body,
} from "inversify-express-utils";
import { TYPES } from "./types";
import { AuthService } from "../services/auth.service";
import UserService from "../services/user.service";
import { UserDto } from "./dto/user.dto";

@controller("/auth")
export class AuthController {
  constructor(
    @inject(TYPES.AuthService) private authService: AuthService,
    @inject(TYPES.UserService) private userService: UserService
  ) {}

  @Post("/login")
  async login(@Body() loginRequest: UserDto) {
    const { email, password } = loginRequest;
    const user = await this.userService.findOne(email);
    if (!user || String(user.password) !== String(password)) {
      throw new Error("Invalid email or password");
    }

    const token = this.authService.generateToken(user);

    return { token };
  }

  @Post("/signup")
  async signup(@Body() loginRequest: UserDto) {
    const { email, password, name } = loginRequest;
    const user = await this.userService.create({ email, password, name });
    if (!user) {
      throw new Error("Cant process signup");
    }
    const userFind = await this.userService.findOne(email);
    const token = this.authService.generateToken(userFind);

    return { token };
  }
}
