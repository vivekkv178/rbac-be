import { Injectable, Logger } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { DATABASE_RBAC } from "src/core/config/databases";
import {
  CreateUserDto,
  CreateUserSuccess,
  DeleteUserSuccess,
  GetUserSuccess,
  UpdateUserDto,
  UpdateUserSuccess,
  UserList,
  UserListItem,
} from "../dto/user.dto";
import { instanceToPlain, plainToInstance } from "class-transformer";
import { User } from "../entities/user.entity";
import { OpenApiError } from "src/core/errors/open-api-error";
import { USER_ERRORS, USER_RESPONSES } from "./users.responses";
import { OPEN_API_ERRORS } from "src/core/errors/open-api.errors";

@Injectable()
export class UsersService {
  private readonly logger = new Logger(UsersService.name);
  constructor(
    @InjectRepository(User, DATABASE_RBAC)
    private readonly userRepository: Repository<User>,
  ) {}

  async findAll(): Promise<UserList> {
    try {
      const users = await this.userRepository.find();
      const userListItems = plainToInstance(UserListItem, users, {
        excludeExtraneousValues: true,
      });

      const userList: UserList = {
        status: "success",
        data: userListItems,
        timestamp: `${Date.now()}`,
        statusCode: 200,
      };

      return userList;
    } catch (error) {
      this.logger.debug("findAll", error);
      throw new OpenApiError(OPEN_API_ERRORS.INTERNAL_SERVER_ERROR);
    }
  }

  async findByEmail(email: string): Promise<GetUserSuccess> {
    try {
      const user = await this.userRepository.findOne({
        where: {
          email: email,
        },
      });

      if (!user) throw new OpenApiError(OPEN_API_ERRORS.NOT_FOUND_ERROR);

      const userDetails = plainToInstance(GetUserSuccess, user, {
        excludeExtraneousValues: true,
      });

      return userDetails;
    } catch (error) {
      this.logger.debug("findByEmail", error);
      if (error?.errorCode === OPEN_API_ERRORS.NOT_FOUND_ERROR.errorCode)
        throw new OpenApiError(OPEN_API_ERRORS.NOT_FOUND_ERROR);
      throw new OpenApiError(OPEN_API_ERRORS.INTERNAL_SERVER_ERROR);
    }
  }

  async getUserDetails(email: string): Promise<User> {
    try {
      const user = await this.userRepository.findOne({
        where: {
          email: email,
        },
      });
      return user;
    } catch (error) {
      this.logger.debug("getUserDetails", error);
      throw new OpenApiError(OPEN_API_ERRORS.INTERNAL_SERVER_ERROR);
    }
  }

  async create(userData: CreateUserDto): Promise<CreateUserSuccess> {
    const data = instanceToPlain(userData);
    try {
      const existingUser = await this.getUserDetails(userData?.email);

      if (existingUser) throw new OpenApiError(USER_ERRORS.DUPLICATE_ERROR);

      const newUser = this.userRepository.create(data);
      const user = this.userRepository.save(newUser);

      const response = plainToInstance(CreateUserSuccess, user, {
        excludeExtraneousValues: true,
      });
      response.message = USER_RESPONSES.CREATE_SUCCESS?.message;

      return response;
    } catch (error) {
      this.logger.debug("create", error);
      if (error?.errorCode === USER_ERRORS.DUPLICATE_ERROR.errorCode)
        throw new OpenApiError(USER_ERRORS.DUPLICATE_ERROR);
      else throw new OpenApiError(OPEN_API_ERRORS.INTERNAL_SERVER_ERROR);
    }
  }

  async update(userData: UpdateUserDto): Promise<UpdateUserSuccess> {
    try {
      const data = instanceToPlain(userData);
      const user = await this.getUserDetails(`${data.email}`);
      const updatedUser = this.userRepository.merge(user, data);
      await this.userRepository.save(updatedUser);
      return USER_RESPONSES.UPDATE_SUCCESS;
    } catch (error) {
      this.logger.debug("update", error);
      if (error?.errorCode === OPEN_API_ERRORS.NOT_FOUND_ERROR.errorCode)
        throw new OpenApiError(OPEN_API_ERRORS.NOT_FOUND_ERROR);
      throw new OpenApiError(OPEN_API_ERRORS.INTERNAL_SERVER_ERROR);
    }
  }

  async delete(email: string): Promise<DeleteUserSuccess> {
    try {
      const user = await this.getUserDetails(email);
      await this.userRepository.delete(user._id);
      return USER_RESPONSES.DELETE_SUCCESS;
    } catch (error) {
      this.logger.debug("delete", error);
      if (error?.errorCode === OPEN_API_ERRORS.NOT_FOUND_ERROR.errorCode)
        throw new OpenApiError(OPEN_API_ERRORS.NOT_FOUND_ERROR);
      throw new OpenApiError(OPEN_API_ERRORS.INTERNAL_SERVER_ERROR);
    }
  }
}
