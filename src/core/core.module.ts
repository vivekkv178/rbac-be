import { Module } from "@nestjs/common";
import { CoreService } from "./core.service";
import { CoreController } from "./core.controller";
import { TokenCreateService } from "./token/token-create.service";
import { PassHashService } from "./token/pass-hash.service";

@Module({
  controllers: [CoreController],
  providers: [CoreService, TokenCreateService, PassHashService],
  exports: [TokenCreateService, PassHashService],
})
export class CoreModule {}
