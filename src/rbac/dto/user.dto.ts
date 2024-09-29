import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { Expose } from "class-transformer";
import {
  IsNotEmpty,
  IsEmail,
  IsOptional,
  IsUUID,
  IsString,
  IsBoolean,
} from "class-validator";
import { UserAccessRole } from "src/core/constants/constants";

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

  @ApiPropertyOptional({
    description: "The password of the user",
    example: "secret",
  })
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

export class DeleteUserDto {
  @ApiProperty({
    description: "The UUID of the user to delete",
    example: "123e4567-e89b-12d3-a456-426614174000",
  })
  @IsNotEmpty()
  @IsUUID()
  @Expose()
  uuid: string;
}

export class CreateUserSuccess {
  @Expose()
  @ApiPropertyOptional({
    description: "Success Message",
    example: "User Added Successfully.",
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
    description: "Ecomm Error Code",
    example: "RBAC_ERR_USER_100",
  })
  ecommErrorCode: string;
}

export class CreateUserValidationError {
  @ApiPropertyOptional({
    description: "Validation Errors",
    example: ["name should not be empty"],
  })
  message: string[];
  @ApiPropertyOptional({
    description: "Ecomm Error Code",
    example: "RBAC_ERR_103",
  })
  ecommErrorCode: string;
}
