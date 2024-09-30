import { ErrorType } from "src/core/errors/open-api.errors";

export enum SignInErrors {
  NOT_REGISTERED_ERROR = "NOT_REGISTERED_ERROR",
  PASSWORD_ERROR = "PASSWORD_ERROR",
}

export const SIGN_IN_ERRORS: {
  [key in SignInErrors]: ErrorType;
} = {
  [SignInErrors.NOT_REGISTERED_ERROR]: {
    message: "You are not registered with us. Please sign up.",
    status: 400,
    errorCode: "RBAC_ERR_SIGN_IN_100",
  },
  [SignInErrors.PASSWORD_ERROR]: {
    message: "Invalid Email or Password",
    status: 400,
    errorCode: "RBAC_ERR_SIGN_IN_101",
  },
};
