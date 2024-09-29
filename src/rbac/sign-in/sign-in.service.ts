import { PassHashService } from "./../../core/token/pass-hash.service";
import { TokenCreateService } from "src/core/token/token-create.service";
import { Injectable } from "@nestjs/common";
import { UsersService } from "../users/users.service";
import { SignInDto } from "../dto/sign-in.dto";
import { plainToInstance } from "class-transformer";
import { CreateUserSuccess } from "../dto/user.dto";
import { OpenApiError } from "src/core/errors/open-api-error";
import { OPEN_API_ERRORS } from "src/core/errors/open-api.errors";
import { SIGN_IN_ERRORS } from "./sign-in.responses";

@Injectable()
export class SignInService {
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
        throw new OpenApiError(OPEN_API_ERRORS.NOT_FOUND_ERROR);
      const user = plainToInstance(CreateUserSuccess, userData);
      const token = await this.tokenService.createToken(user);
      return { access_token: token };
    } catch (error: any) {
      if (error?.errorCode === SIGN_IN_ERRORS.NOT_REGISTERED_ERROR?.errorCode)
        throw new OpenApiError(SIGN_IN_ERRORS.NOT_REGISTERED_ERROR);
      else throw new OpenApiError(OPEN_API_ERRORS.INTERNAL_SERVER_ERROR);
    }
  }
}
