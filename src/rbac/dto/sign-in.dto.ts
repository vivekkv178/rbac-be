import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { Expose } from "class-transformer";
import { IsNotEmpty, IsEmail, IsString } from "class-validator";

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
    description: "Success Message",
    example: "User Added Successfully.",
  })
  message: string;
}
