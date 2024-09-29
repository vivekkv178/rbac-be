import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { Expose } from "class-transformer";
import { IsNotEmpty, IsEmail, IsString } from "class-validator";

export class SignUpDto {
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
    description: "The password of the user",
    example: "secret",
  })
  @IsNotEmpty()
  @Expose()
  password: string;
}

export class SignUpSuccess {
  @ApiPropertyOptional({
    description: "Success Message",
    example: "User Added Successfully.",
  })
  message: string;
}

export class SignUpDuplicateError {
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

export class SignUpValidationError {
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
