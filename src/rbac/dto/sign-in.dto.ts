import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { Expose } from "class-transformer";
import { IsNotEmpty, IsEmail, IsString } from "class-validator";
import { SIGN_IN_ERRORS } from "../sign-in/sign-in.responses";

export class SignInDto {
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
  @IsString()
  password: string;
}

export class SignInSuccess {
  @ApiPropertyOptional({
    description: "Access Token",
    example:
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI2NmY4ZDc5NDdiODM4YTZmNjAzOTZiODUiLCJlbWFpbCI6InN1cGVyYWRtaW5AdGVzdC5jb20iLCJyb2xlIjoiU1VQRVJfQURNSU4iLCJpYXQiOjE3Mjc1ODQxNDgsImV4cCI6MTcyNzU4Nzc0OH0.7gnEG7p3YiTE2dTUOAXDagC_fLQXNcAfMJDrMXTwA4Y",
  })
  access_token: string;
}

export class SignInValidationError {
  @ApiPropertyOptional({
    description: "Validation Errors",
    example: [
      "email must be an email",
      "email should not be empty",
      "password must be a string",
      "password should not be empty",
    ],
  })
  message: string[];
  @ApiPropertyOptional({
    description: "Error Code",
    example: "API_ERR_103",
  })
  errorCode: string;
}

export class NotRegisteredError {
  @ApiPropertyOptional({
    description: "Message",
    example: SIGN_IN_ERRORS.NOT_REGISTERED_ERROR.message,
  })
  message: string;
  @ApiPropertyOptional({
    description: "Error Code",
    example: SIGN_IN_ERRORS.NOT_REGISTERED_ERROR.errorCode,
  })
  errorCode: string;
}

export class PasswordError {
  @ApiPropertyOptional({
    description: "Message",
    example: SIGN_IN_ERRORS.PASSWORD_ERROR.message,
  })
  message: string;
  @ApiPropertyOptional({
    description: "Error Code",
    example: SIGN_IN_ERRORS.PASSWORD_ERROR.errorCode,
  })
  errorCode: string;
}
