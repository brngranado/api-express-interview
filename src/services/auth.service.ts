import { sign, verify } from "jsonwebtoken";
import { injectable } from "inversify";
import { Auth } from "./interfaces/auth.interface";
import { validate } from "class-validator";

@injectable()
export class AuthService {
  private secretKey = "app_firestore_secret";

  generateToken(user: Auth): string {
    const payload = {
      userId: user.user_id,
      email: user.email,
      password: user.password,
    };
    if (!sign) {
      throw new Error("jsonwebtoken is not defined");
    }

    const token = sign(payload, this.secretKey, {
      expiresIn: "1h",
    });

    return token;
  }
  verifyToken(token: string) {
    if (!token) {
      throw new Error("UNAUTHORIZED: jwt token is not defined");
    }
    const bearer = "Bearer ";
    const tokenWithoutBearer = token.split(bearer)[1];
    const decoded = verify(tokenWithoutBearer, this.secretKey, {
      complete: true,
    });

    return decoded;
  }
}
