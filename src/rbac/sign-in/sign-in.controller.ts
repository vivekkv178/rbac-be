import { Controller, Post, Body, HttpCode } from "@nestjs/common";
import { SignInService } from "./sign-in.service";
import {
  ApiBadRequestResponse,
  ApiExtraModels,
  ApiInternalServerErrorResponse,
  ApiOperation,
  ApiResponse,
  ApiTags,
  refs,
} from "@nestjs/swagger";
import {
  OPEN_API_PATHS,
  OPEN_API_RESOURCES,
  OPEN_API_TAGS,
} from "src/core/constants/constants";
import { InternalServerError } from "src/core/errors/open-api-error";
import {
  NotRegisteredError,
  SignInDto,
  SignInSuccess,
  SignInValidationError,
} from "../dto/sign-in.dto";

@ApiTags(OPEN_API_TAGS.AUTH)
@Controller(`${OPEN_API_RESOURCES.AUTH}${OPEN_API_PATHS.SIGN_IN}`)
export class SignInController {
  constructor(private readonly signInService: SignInService) {}
  @ApiOperation({
    description: "Enables user Sign in to the app.",
    summary: "Sign In",
  })
  @ApiResponse({
    type: SignInSuccess,
    status: 200,
  })
  @ApiExtraModels(SignInValidationError, NotRegisteredError)
  @ApiBadRequestResponse({
    schema: {
      anyOf: refs(SignInValidationError, NotRegisteredError),
    },
  })
  @ApiInternalServerErrorResponse({
    type: InternalServerError,
  })
  @HttpCode(200)
  @Post()
  async signIn(@Body() signInData: SignInDto): Promise<SignInSuccess> {
    return this.signInService.signIn(signInData);
  }
}
