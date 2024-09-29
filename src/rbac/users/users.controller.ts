import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
  HttpCode,
  UseGuards,
} from "@nestjs/common";
import { UsersService } from "./users.service";
import {
  ApiBadRequestResponse,
  ApiExtraModels,
  ApiForbiddenResponse,
  ApiInternalServerErrorResponse,
  ApiNotFoundResponse,
  ApiOperation,
  ApiParam,
  ApiResponse,
  ApiSecurity,
  ApiTags,
  ApiUnauthorizedResponse,
  refs,
} from "@nestjs/swagger";
import {
  OPEN_API_PATHS,
  OPEN_API_RESOURCES,
  OPEN_API_TAGS,
  UserAccessRole,
} from "src/core/constants/constants";

import {
  ForbiddenError,
  InternalServerError,
  NotFoundError,
  UnauthorizedError,
} from "src/core/errors/open-api-error";
import {
  CreateUserDto,
  CreateUserDuplicateError,
  CreateUserSuccess,
  CreateUserValidationError,
  DeleteUserSuccess,
  GetUserDto,
  GetUserSuccess,
  UpdateUserDto,
  UpdateUserSuccess,
  UpdateUserValidationError,
  UserList,
} from "../dto/user.dto";
import { Roles } from "src/core/decorators/roles/roles.decorator";
import { AuthGuard } from "src/core/guards/auth/auth.guard";

@ApiTags(OPEN_API_TAGS.USER)
@ApiSecurity(OPEN_API_TAGS.API_TOKEN_HEADER)
@UseGuards(AuthGuard)
@Controller(`${OPEN_API_RESOURCES.CONFIG}${OPEN_API_PATHS.USER}`)
export class UsersController {
  constructor(private readonly usersService: UsersService) {}
  @ApiOperation({
    description:
      "Super admin is allowed to create a user if we want to make this app an Invite only app.",
    summary: "Users - Create",
  })
  @ApiResponse({
    type: CreateUserSuccess,
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
  @Roles(UserAccessRole.SUPER_ADMIN)
  async create(@Body() userData: CreateUserDto): Promise<CreateUserSuccess> {
    return this.usersService.create(userData);
  }

  @ApiOperation({
    description: "User can list all the users registered in the app.",
    summary: "Users - List",
  })
  @ApiResponse({
    type: UserList,
    status: 200,
  })
  @ApiInternalServerErrorResponse({
    type: InternalServerError,
  })
  @ApiUnauthorizedResponse({
    type: UnauthorizedError,
  })
  @HttpCode(200)
  @Get()
  async findAll(): Promise<UserList> {
    return this.usersService.findAll();
  }

  @ApiOperation({
    description:
      "User can get all the details of a user registered in the app.",
    summary: "Users - Get",
  })
  @ApiResponse({
    type: UserList,
    status: 200,
  })
  @ApiInternalServerErrorResponse({
    type: InternalServerError,
  })
  @ApiUnauthorizedResponse({
    type: UnauthorizedError,
  })
  @ApiNotFoundResponse({ type: NotFoundError })
  @HttpCode(200)
  @Get(":email")
  async findByEmail(@Param() params: GetUserDto): Promise<GetUserSuccess> {
    return this.usersService.findByEmail(params.email);
  }

  @ApiOperation({
    description: "Super Admins and Admins are allowed to update a user.",
    summary: "Users - Update",
  })
  @ApiResponse({
    type: UpdateUserSuccess,
    status: 200,
  })
  @ApiExtraModels(UpdateUserValidationError)
  @ApiBadRequestResponse({
    schema: {
      anyOf: refs(UpdateUserValidationError),
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
  @ApiNotFoundResponse({ type: NotFoundError })
  @HttpCode(200)
  @Put()
  @Roles(UserAccessRole.SUPER_ADMIN, UserAccessRole.ADMIN)
  async update(@Body() userData: UpdateUserDto): Promise<UpdateUserSuccess> {
    return this.usersService.update(userData);
  }

  @ApiOperation({
    description: "Super Admins are allowed to delete a user.",
    summary: "Users - Delete",
  })
  @ApiResponse({
    type: DeleteUserSuccess,
    status: 200,
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
  @ApiNotFoundResponse({ type: NotFoundError })
  @HttpCode(200)
  @ApiParam({
    name: "email",
    description: "Email of the user to be deleted.",
    required: true,
    example: "john@example.com",
  })
  @Delete(":email")
  @Roles(UserAccessRole.SUPER_ADMIN)
  async delete(@Param("email") email: string): Promise<DeleteUserSuccess> {
    return this.usersService.delete(email);
  }
}
