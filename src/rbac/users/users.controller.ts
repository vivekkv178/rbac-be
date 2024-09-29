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
  ApiOperation,
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
  UnauthorizedError,
} from "src/core/errors/open-api-error";
import { User } from "../entities/user.entity";
import {
  CreateUserDto,
  CreateUserDuplicateError,
  CreateUserSuccess,
  CreateUserValidationError,
  GetUserDto,
  UpdateUserDto,
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

  @Get()
  async findAll(): Promise<User[]> {
    return this.usersService.findAll();
  }

  @Get(":email")
  async findByEmail(@Param() params: GetUserDto): Promise<User> {
    return this.usersService.findByEmail(params.email);
  }

  @Put()
  @Roles(UserAccessRole.SUPER_ADMIN, UserAccessRole.ADMIN)
  async update(@Body() userData: UpdateUserDto): Promise<User> {
    return this.usersService.update(userData);
  }

  @Delete(":email")
  @Roles(UserAccessRole.SUPER_ADMIN)
  async delete(@Param("email") email: string): Promise<void> {
    return this.usersService.delete(email);
  }
}
