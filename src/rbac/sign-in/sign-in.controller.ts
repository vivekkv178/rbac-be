import { Controller, Post, Body, HttpCode } from "@nestjs/common";
import { SignInService } from "./sign-in.service";
import {
  ApiBadRequestResponse,
  ApiExtraModels,
  ApiForbiddenResponse,
  ApiInternalServerErrorResponse,
  ApiOperation,
  ApiResponse,
  ApiTags,
  ApiUnauthorizedResponse,
  refs,
} from "@nestjs/swagger";
import {
  OPEN_API_PATHS,
  OPEN_API_RESOURCES,
  OPEN_API_TAGS,
} from "src/core/constants/constants";

import {
  ForbiddenError,
  InternalServerError,
  UnauthorizedError,
} from "src/core/errors/open-api-error";
import {
  CreateUserDuplicateError,
  CreateUserValidationError,
} from "../dto/user.dto";
import { SignInDto, SignInSuccess } from "../dto/sign-in.dto";

@ApiTags(OPEN_API_TAGS.AUTH)
@Controller(`${OPEN_API_RESOURCES.AUTH}${OPEN_API_PATHS.SIGN_IN}`)
export class SignInController {
  constructor(private readonly signInService: SignInService) {}
  @ApiOperation({
    description: "Creates an user",
    summary: "Sign In",
  })
  @ApiResponse({
    type: SignInSuccess,
    status: 200,
  })
  @ApiExtraModels(CreateUserDuplicateError, CreateUserValidationError)
  @ApiBadRequestResponse({
    schema: {
      anyOf: refs(CreateUserDuplicateError, CreateUserValidationError),
    },
  })
  @ApiInternalServerErrorResponse({
    type: InternalServerError,
  })
  @ApiForbiddenResponse({
    type: ForbiddenError,
  })
  @ApiUnauthorizedResponse({
    type: UnauthorizedError,
  })
  @HttpCode(200)
  @Post()
  async signIn(@Body() signInData: SignInDto): Promise<any> {
    return this.signInService.signIn(signInData);
  }
}
