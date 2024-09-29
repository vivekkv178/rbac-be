import { SetMetadata } from "@nestjs/common";
import { COMMON_CONSTANTS } from "src/core/constants/constants";

export const Roles = (...args: string[]) =>
  SetMetadata(COMMON_CONSTANTS.ROLES_DECORATOR, args);
