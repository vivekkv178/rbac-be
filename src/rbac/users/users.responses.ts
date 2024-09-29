import { ErrorType } from "src/core/errors/open-api.errors";

export enum UserErrors {
  DUPLICATE_ERROR = "DUPLICATE_ERROR",
}

export const USER_ERRORS: {
  [key in UserErrors]: ErrorType;
} = {
  [UserErrors.DUPLICATE_ERROR]: {
    message: "User already exists.",
    status: 400,
    errorCode: "RBAC_ERR_USER_100",
  },
};
