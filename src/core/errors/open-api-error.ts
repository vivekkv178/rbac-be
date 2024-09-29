import { ApiPropertyOptional } from "@nestjs/swagger";
import { ErrorType, OPEN_API_ERRORS } from "./open-api.errors";

export class OpenApiError extends Error {
  status: number;
  errorCode: string;

  constructor(error: ErrorType) {
    super(error.message);
    this.status = error.status;
    this.errorCode = error.errorCode;
  }
}

export class UnauthorizedError {
  @ApiPropertyOptional({
    description: "Error Message",
    example: OPEN_API_ERRORS.INVALID_API_KEY.message,
  })
  message: string;
  @ApiPropertyOptional({
    description: "RBAC Error Code",
    example: OPEN_API_ERRORS.INVALID_API_KEY.errorCode,
  })
  errorCode: string;
}

export class InternalServerError {
  @ApiPropertyOptional({
    description: "Error Message",
    example: OPEN_API_ERRORS.INTERNAL_SERVER_ERROR.message,
  })
  message: string;
  @ApiPropertyOptional({
    description: "RBAC Error Code",
    example: OPEN_API_ERRORS.INTERNAL_SERVER_ERROR.errorCode,
  })
  errorCode: string;
}

export class ForbiddenError {
  @ApiPropertyOptional({
    description: "Error Message",
    example: OPEN_API_ERRORS.FORBIDDEN_ERROR.message,
  })
  message: string;
  @ApiPropertyOptional({
    description: "Error Code",
    example: OPEN_API_ERRORS.FORBIDDEN_ERROR.errorCode,
  })
  errorCode: string;
}

export class NotFoundError {
  @ApiPropertyOptional({
    description: "Error Message",
    example: OPEN_API_ERRORS.NOT_FOUND_ERROR.message,
  })
  message: string;
  @ApiPropertyOptional({
    description: "Error Code",
    example: OPEN_API_ERRORS.NOT_FOUND_ERROR.errorCode,
  })
  errorCode: string;
}

export class ListLimitError {
  @ApiPropertyOptional({
    description: "Error Message",
    example: [
      "limit must not be greater than 20",
      "limit must not be less than 0",
      "limit must be a number conforming to the specified constraints",
    ],
  })
  message: string[];
  @ApiPropertyOptional({
    description: "Error Code",
    example: OPEN_API_ERRORS.VALIDATION_ERROR.errorCode,
  })
  errorCode: string;
}

export class ListPageError {
  @ApiPropertyOptional({
    description: "Error Message",
    example: [
      "page must not be greater than 20",
      "page must not be less than 0",
      "page must be a number conforming to the specified constraints",
    ],
  })
  message: string[];
  @ApiPropertyOptional({
    description: "Error Code",
    example: OPEN_API_ERRORS.VALIDATION_ERROR.errorCode,
  })
  errorCode: string;
}
