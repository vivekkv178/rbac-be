import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { DATABASE_RBAC } from "src/core/config/databases";
import {
  CreateUserDto,
  CreateUserSuccess,
  UpdateUserDto,
} from "../dto/user.dto";
import { instanceToPlain, plainToInstance } from "class-transformer";
import { User } from "../entities/user.entity";
import { OpenApiError } from "src/core/errors/open-api-error";
import { USER_ERRORS } from "./users.responses";
import { OPEN_API_ERRORS } from "src/core/errors/open-api.errors";

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User, DATABASE_RBAC)
    private readonly userRepository: Repository<User>,
  ) {}

  async findAll(): Promise<User[]> {
    return this.userRepository.find();
  }

  // async findById(id: string): Promise<User> {
  //   return this.userRepository.findOne({
  //     where: {
  //       uuid: id,
  //     },
  //   });
  // }

  async findByEmail(email: string): Promise<User> {
    try {
      const user = this.userRepository.findOne({
        where: {
          email: email,
        },
      });

      if (!user) throw new OpenApiError(OPEN_API_ERRORS.NOT_FOUND_ERROR);
      return user;
    } catch (error) {}
  }

  async create(userData: CreateUserDto): Promise<CreateUserSuccess> {
    const data = instanceToPlain(userData);
    try {
      const existingUser = await this.findByEmail(userData?.email);

      if (existingUser) throw new OpenApiError(USER_ERRORS.DUPLICATE_ERROR);

      const newUser = this.userRepository.create(data);
      const user = this.userRepository.save(newUser);

      const response = plainToInstance(CreateUserSuccess, user, {
        excludeExtraneousValues: true,
      });
      response.message = "User Created Successfully.";

      return response;
    } catch (error) {
      if (error?.errorCode === USER_ERRORS.DUPLICATE_ERROR.errorCode)
        throw new OpenApiError(USER_ERRORS.DUPLICATE_ERROR);
    }
  }

  async update(userData: UpdateUserDto): Promise<User> {
    const data = instanceToPlain(userData);
    const user = await this.findByEmail(`${data.email}`);
    await this.userRepository.update(user._id, data);
    return;
  }

  async delete(email: string): Promise<void> {
    const user = await this.findByEmail(email);
    await this.userRepository.delete(user._id);
  }
}
