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

export const USER_RESPONSES = {
  CREATE_SUCCESS: {
    message: "User Created Successfully.",
    status: 200,
  },
  UPDATE_SUCCESS: {
    message: "User Updated Successfully.",
    status: 200,
  },
  DELETE_SUCCESS: {
    message: "User Deleted Successfully.",
    status: 200,
  },
};
