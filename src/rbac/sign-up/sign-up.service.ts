import { Injectable } from "@nestjs/common";
import { CreateUserDto } from "../dto/user.dto";
import { instanceToPlain, plainToInstance } from "class-transformer";
import { UsersService } from "../users/users.service";
import { SignUpDto } from "../dto/sign-up.dto";
import { OpenApiError } from "src/core/errors/open-api-error";
import { SIGN_UP_ERRORS } from "./sign-up.responses";
import { USER_ERRORS } from "../users/users.responses";
import { TokenCreateService } from "src/core/token/token-create.service";
import { OPEN_API_ERRORS } from "src/core/errors/open-api.errors";
import { PassHashService } from "src/core/token/pass-hash.service";
import { UserAccessRole } from "src/core/constants/constants";

@Injectable()
export class SignUpService {
  constructor(
    private usersService: UsersService,
    private tokenService: TokenCreateService,
    private passHashService: PassHashService,
  ) {}

  async signUp(signUpData: SignUpDto): Promise<any> {
    const data = instanceToPlain(signUpData);
    data.is_registered = true;
    data.access_role = UserAccessRole.USER;

    const userData = plainToInstance(CreateUserDto, data, {
      excludeExtraneousValues: true,
    });

    try {
      userData.password = await this.passHashService.hashPassword(
        userData?.password,
      );
      const user = await this.usersService.create(userData);
      const token = await this.tokenService.createToken(user);
      return { access_token: token };
    } catch (error) {
      if (error?.errorCode === USER_ERRORS.DUPLICATE_ERROR.errorCode)
        throw new OpenApiError(SIGN_UP_ERRORS.DUPLICATE_ERROR);
      else throw new OpenApiError(OPEN_API_ERRORS.INTERNAL_SERVER_ERROR);
    }
  }
}
