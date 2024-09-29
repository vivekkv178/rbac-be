import { Injectable } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { CreateUserSuccess } from "src/rbac/dto/user.dto";

@Injectable()
export class TokenCreateService {
  constructor(private jwtService: JwtService) {}

  async createToken(user: CreateUserSuccess): Promise<any> {
    const payload = { sub: user.user_id, email: user.email, role: user.role };
    console.log(payload);

    return this.jwtService.signAsync(payload);
  }
}
