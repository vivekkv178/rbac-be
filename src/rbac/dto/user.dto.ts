import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { Expose } from "class-transformer";
import {
  IsNotEmpty,
  IsEmail,
  IsOptional,
  IsString,
  IsBoolean,
} from "class-validator";
import { UserAccessRole } from "src/core/constants/constants";
import { USER_RESPONSES } from "../users/users.responses";

export class CreateUserDto {
  @ApiProperty({ description: "The name of the user", example: "John" })
  @IsNotEmpty()
  @IsString()
  @Expose()
  name: string;

  @ApiProperty({
    description: "The email address of the user",
    example: "john@example.com",
  })
  @IsNotEmpty()
  @IsEmail()
  @Expose()
  email: string;

  @Expose()
  password: string;

  @ApiProperty({
    description: "The access role of the user",
    enum: UserAccessRole,
  })
  @IsNotEmpty()
  @IsString()
  @Expose()
  access_role: UserAccessRole;

  @ApiPropertyOptional({
    description: "Indicates if the user is signed up.",
    example: false,
  })
  @IsOptional()
  @IsBoolean()
  @Expose()
  is_registered: boolean;
}

export class CreateUserSuccess {
  @Expose()
  @ApiPropertyOptional({
    description: "Success Message",
    example: USER_RESPONSES.CREATE_SUCCESS?.message,
  })
  message: string;
  @Expose()
  @ApiPropertyOptional({
    description: "Name of the user",
    example: "John",
  })
  name: string;
  @Expose()
  @ApiPropertyOptional({
    description: "Email of the user",
    example: "john@example.com",
  })
  email: string;
  @Expose({ name: "access_role" })
  @ApiPropertyOptional({
    description: "Role of the user",
    example: "USER",
  })
  role: string;
  @Expose({ name: "_id" })
  @ApiPropertyOptional({
    description: "Id of the user",
    example: "ksdbfjkb12ih98",
  })
  user_id: string;
}

export class CreateUserDuplicateError {
  @ApiPropertyOptional({
    description: "Error Message",
    example: "User Name already exists.",
  })
  message: string;
  @ApiPropertyOptional({
    description: "Error Code",
    example: "RBAC_ERR_USER_100",
  })
  ecommErrorCode: string;
}

export class CreateUserValidationError {
  @ApiPropertyOptional({
    description: "Timestamp",
  })
  @Expose()
  timestamp: string;
  @ApiPropertyOptional({
    description: "Validation Errors",
    example: [
      "name must be a string",
      "name should not be empty",
      "email must be an email",
      "email should not be empty",
      "access_role must be a string",
      "access_role should not be empty",
    ],
  })
  message: string[];
  @ApiPropertyOptional({
    description: "Error Code",
    example: "RBAC_ERR_103",
  })
  ecommErrorCode: string;
}

export class UserListItem {
  @ApiPropertyOptional({
    description: "Name of the User.",
  })
  @Expose()
  name: string;

  @ApiPropertyOptional({
    description: "Email of the User.",
  })
  @Expose()
  email: string;

  @ApiPropertyOptional({
    description: "Role of the User.",
  })
  @Expose()
  access_role: string;
}

export class UserList {
  @ApiPropertyOptional({
    description: "Status",
  })
  @Expose()
  status: string;

  @ApiPropertyOptional({ type: UserListItem, isArray: true })
  @Expose()
  data: UserListItem[];

  @ApiPropertyOptional({
    description: "Timestamp",
  })
  @Expose()
  timestamp: string;

  @ApiPropertyOptional({
    description: "Status Code",
  })
  @Expose()
  statusCode: number;
}

export class UpdateUserDto {
  @ApiProperty({ description: "The name of the user", example: "John" })
  @IsNotEmpty()
  @IsString()
  @Expose()
  name: string;

  @ApiProperty({
    description: "The email address of the user",
    example: "john@example.com",
  })
  @IsNotEmpty()
  @IsEmail()
  @Expose()
  email: string;

  @ApiProperty({
    description: "The access role of the user",
    enum: UserAccessRole,
  })
  @IsNotEmpty()
  @IsString()
  @Expose()
  access_role: UserAccessRole;
}

export class UpdateUserSuccess {
  @Expose()
  @ApiPropertyOptional({
    description: "Success Message",
    example: USER_RESPONSES?.UPDATE_SUCCESS.message,
  })
  message: string;
}

export class UpdateUserValidationError {
  @ApiPropertyOptional({
    description: "Timestamp",
  })
  @Expose()
  timestamp: string;
  @ApiPropertyOptional({
    description: "Validation Errors",
    example: [
      "name must be a string",
      "name should not be empty",
      "email must be an email",
      "email should not be empty",
      "access_role must be a string",
      "access_role should not be empty",
    ],
  })
  message: string[];
  @ApiPropertyOptional({
    description: "Error Code",
    example: "RBAC_ERR_103",
  })
  ecommErrorCode: string;
}

export class GetUserDto {
  @ApiProperty({
    description: "The email of the user",
    example: "john@example.com",
  })
  @IsNotEmpty()
  @IsEmail()
  @Expose()
  email: string;
}

export class GetUserSuccess {
  @Expose()
  @ApiPropertyOptional({
    description: "Name of the user",
    example: "John",
  })
  name: string;
  @Expose()
  @ApiPropertyOptional({
    description: "Email of the user",
    example: "john@example.com",
  })
  email: string;
  @Expose()
  @ApiPropertyOptional({
    description: "Role of the user",
    example: "USER",
  })
  access_role: string;
  @Expose()
  @ApiPropertyOptional({
    description: "Id of the user",
    example: "ksdbfjkb12ih98",
  })
  _id: string;
}

export class DeleteUserSuccess {
  @Expose()
  @ApiPropertyOptional({
    description: "Success Message",
    example: USER_RESPONSES?.DELETE_SUCCESS.message,
  })
  message: string;
}
