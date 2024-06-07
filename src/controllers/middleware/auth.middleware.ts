import { injectable, inject } from "inversify";
import { BaseMiddleware } from "inversify-express-utils";
import { Request, Response, NextFunction } from "express";
import { TYPES } from "../types";
import { AuthService } from "../../services/auth.service";
import { container } from "../../config/inversify.config";

@injectable()
export class AuthMiddleware extends BaseMiddleware {
  constructor(@inject(TYPES.AuthService) private authService: AuthService) {
    super();
  }

  public handler(req: Request, res: Response, next: NextFunction) {
    if (String(req?.headers["Authorization"]) !== undefined) {
      const token = req.headers["authorization"];
      const decoded = this.authService.verifyToken(token);
      req["user"] = decoded;
    } else {
      console.log("res", res);
    }
  }
}

export function UseAuthMiddleware() {
  return function (
    target: any,
    propertyKey: string,
    descriptor: PropertyDescriptor
  ) {
    const originalMethod = descriptor.value;
    descriptor.value = function (...args: any[]) {
      const [req, res, next] = args;
      const authMiddleware = container.get<AuthMiddleware>(
        TYPES.AuthMiddleware
      );
      authMiddleware.handler(req, res, next);
      return originalMethod.apply(this, args);
    };

    return descriptor;
  };
}
