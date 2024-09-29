import { ErrorType } from "src/core/errors/open-api.errors";

export enum SignUpErrors {
  DUPLICATE_ERROR = "DUPLICATE_ERROR",
}

export const SIGN_UP_ERRORS: {
  [key in SignUpErrors]: ErrorType;
} = {
  [SignUpErrors.DUPLICATE_ERROR]: {
    message: "You are already registered with us. Please proceed with sign in.",
    status: 400,
    errorCode: "RBAC_ERR_SIGN_UP_100",
  },
};
