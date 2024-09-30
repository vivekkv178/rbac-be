export const OPEN_API_TAGS = {
  USER: "User",
  AUTH: "Auth",
  API_KEY_HEADER: "ApiKeyHeader",
  API_TOKEN_HEADER: "ApiTokenHeader",
};

export const OPEN_API_VERSIONS = {
  V1: "/v1",
};

export const OPEN_API_RESOURCES = {
  CONFIG: "/config",
  AUTH: "/auth",
};

export const OPEN_API_PATHS = {
  USER: "/user",
  SIGN_UP: "/sign-up",
  SIGN_IN: "/sign-in",
};

export const OPEN_API_AUTH = {
  API_KEY_HEADER: "x-api-key",
  TOKEN_HEADER: "authorization",
};

export const COMMON_CONSTANTS = {
  ROLES_DECORATOR: "roles",
};

export enum UserAccessRole {
  USER = "USER",
  ADMIN = "ADMIN",
  SUPER_ADMIN = "SUPER_ADMIN",
}
