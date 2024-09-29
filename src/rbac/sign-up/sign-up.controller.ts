import { Controller, Post, Body, HttpCode } from "@nestjs/common";
import { SignUpService } from "./sign-up.service";
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
  SignUpDto,
  SignUpDuplicateError,
  SignUpSuccess,
  SignUpValidationError,
} from "../dto/sign-up.dto";

@ApiTags(OPEN_API_TAGS.AUTH)
@Controller(`${OPEN_API_RESOURCES.AUTH}${OPEN_API_PATHS.SIGN_UP}`)
export class SignUpController {
  constructor(private readonly signUpService: SignUpService) {}
  @ApiOperation({
    description: "Enables user Sign up to the app.",
    summary: "Sign Up",
  })
  @ApiResponse({
    type: SignUpSuccess,
    status: 200,
  })
  @ApiExtraModels(SignUpDuplicateError, SignUpValidationError)
  @ApiBadRequestResponse({
    schema: {
      anyOf: refs(SignUpDuplicateError, SignUpValidationError),
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
  async signUp(@Body() signUpData: SignUpDto): Promise<any> {
    return this.signUpService.signUp(signUpData);
  }
}
