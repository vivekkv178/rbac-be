import {
  CanActivate,
  ExecutionContext,
  Injectable,
  Logger,
} from "@nestjs/common";
import { Request } from "express";
import { OpenApiError } from "src/core/errors/open-api-error";
import { OPEN_API_ERRORS } from "src/core/errors/open-api.errors";
import { COMMON_CONSTANTS, OPEN_API_AUTH } from "src/core/constants/constants";
import { JwtService } from "@nestjs/jwt";
import { UsersService } from "src/rbac/users/users.service";
import { Reflector } from "@nestjs/core";

@Injectable()
export class AuthGuard implements CanActivate {
  private readonly logger = new Logger(AuthGuard.name);
  constructor(
    private readonly jwtService: JwtService,
    private readonly userService: UsersService,
    private reflector: Reflector,
  ) {}
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const user = await this.getUser(request);

    const roles = this.reflector.get<string[]>(
      COMMON_CONSTANTS.ROLES_DECORATOR,
      context.getHandler(),
    );

    let validRequest = false;

    if (!roles || (roles && roles.includes(user?.userData?.access_role)))
      validRequest = true;

    if (validRequest) return true;
    else throw new OpenApiError(OPEN_API_ERRORS.FORBIDDEN_ERROR);
  }

  private async getUser(request: Request): Promise<any> {
    try {
      const tokenHeader = OPEN_API_AUTH.TOKEN_HEADER;
      if (
        request.headers[tokenHeader] &&
        (request.headers[tokenHeader] as string).trim()
      ) {
        const header = request.headers[tokenHeader] as string;
        const token = header.split(" ")[1];
        this.jwtService.verify(token);

        const tokenData = this.jwtService.decode(token);
        const userData = await this.userService.findByEmail(tokenData?.email);
        return { userData, tokenData };
      } else {
        throw new OpenApiError(OPEN_API_ERRORS.INVALID_API_KEY);
      }
    } catch (error: any) {
      if (error?.errorCode === OPEN_API_ERRORS.INVALID_API_KEY.errorCode)
        throw new OpenApiError(OPEN_API_ERRORS.INVALID_API_KEY);
      else throw new OpenApiError(OPEN_API_ERRORS.FORBIDDEN_ERROR);
    }
  }
}
