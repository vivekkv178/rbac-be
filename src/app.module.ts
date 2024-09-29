import { Module } from "@nestjs/common";
import { DocsModule } from "./docs/docs.module";
import { CoreModule } from "./core/core.module";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { TypeOrmModule } from "@nestjs/typeorm";
import { APP_FILTER } from "@nestjs/core";

import databases, { DATABASE_RBAC, DATABASES } from "./core/config/databases";
import { RbacModule } from "./rbac/rbac.module";
import { AllExceptionFilter } from "./core/filters/all-exception-filter";
import { JwtModule, JwtService } from "@nestjs/jwt";

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [databases],
    }),
    TypeOrmModule.forRootAsync({
      name: DATABASE_RBAC,
      inject: [ConfigService],
      useFactory: (configService: ConfigService) =>
        configService.get(`${DATABASES}.${DATABASE_RBAC}`),
    }),
    JwtModule.register({
      global: true,
      secret: process.env.JWT_SECRET,
      signOptions: {
        expiresIn: "3600s",
      },
    }),
    CoreModule,
    DocsModule,
    RbacModule,
  ],
  controllers: [],
  providers: [
    {
      provide: APP_FILTER,
      useClass: AllExceptionFilter,
    },
    JwtService,
  ],
})
export class AppModule {}
