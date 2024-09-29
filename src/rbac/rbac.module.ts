import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { DATABASE_RBAC } from "src/core/config/databases";
import { UsersController } from "./users/users.controller";
import { UsersService } from "./users/users.service";
import { User } from "./entities/user.entity";
import { SignUpController } from "./sign-up/sign-up.controller";
import { SignUpService } from "./sign-up/sign-up.service";
import { TokenCreateService } from "src/core/token/token-create.service";
import { SignInController } from "./sign-in/sign-in.controller";
import { SignInService } from "./sign-in/sign-in.service";
import { PassHashService } from "src/core/token/pass-hash.service";

@Module({
  imports: [TypeOrmModule.forFeature([User], DATABASE_RBAC)],
  controllers: [SignUpController, SignInController, UsersController],
  providers: [
    UsersService,
    SignUpService,
    SignInService,
    TokenCreateService,
    PassHashService,
  ],
})
export class RbacModule {}
