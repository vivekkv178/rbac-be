import { PassHashService } from "./../../core/token/pass-hash.service";
import { TokenCreateService } from "src/core/token/token-create.service";
import { Injectable, Logger } from "@nestjs/common";
import { UsersService } from "../users/users.service";
import { SignInDto } from "../dto/sign-in.dto";
import { plainToInstance } from "class-transformer";
import { CreateUserSuccess } from "../dto/user.dto";
import { OpenApiError } from "src/core/errors/open-api-error";
import { OPEN_API_ERRORS } from "src/core/errors/open-api.errors";
import { SIGN_IN_ERRORS } from "./sign-in.responses";

@Injectable()
export class SignInService {
  private readonly logger = new Logger(SignInService.name);
  constructor(
    private usersService: UsersService,
    private tokenService: TokenCreateService,
    private passHashService: PassHashService,
  ) {}

  async signIn(signInData: SignInDto) {
    try {
      const userData = await this.usersService.getUserDetails(
        signInData?.email,
      );
      if (!userData)
        throw new OpenApiError(SIGN_IN_ERRORS.NOT_REGISTERED_ERROR);
      const passwordMatched = await this.passHashService.comparePassword(
        signInData?.password,
        userData?.password,
      );
      if (!passwordMatched)
        throw new OpenApiError(SIGN_IN_ERRORS.PASSWORD_ERROR);
      const user = plainToInstance(CreateUserSuccess, userData);
      const token = await this.tokenService.createToken(user);
      return { access_token: token };
    } catch (error: any) {
      this.logger.debug("signIn", error);
      if (error?.errorCode === SIGN_IN_ERRORS.NOT_REGISTERED_ERROR?.errorCode)
        throw new OpenApiError(SIGN_IN_ERRORS.NOT_REGISTERED_ERROR);
      else if (error?.errorCode === SIGN_IN_ERRORS.PASSWORD_ERROR?.errorCode)
        throw new OpenApiError(SIGN_IN_ERRORS.PASSWORD_ERROR);
      else throw new OpenApiError(OPEN_API_ERRORS.INTERNAL_SERVER_ERROR);
    }
  }
}
