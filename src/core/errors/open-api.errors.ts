export enum OpenAPIErrors {
  INTERNAL_SERVER_ERROR = 'INTERNAL_SERVER_ERROR',
  FORBIDDEN_ERROR = 'FORBIDDEN_ERROR',
  VALIDATION_ERROR = 'VALIDATION_ERROR',
  NOT_FOUND_ERROR = 'NOT_FOUND_ERROR',
  INVALID_API_KEY = 'INVALID_API_KEY',
}

export interface ErrorType {
  message: string;
  status: number;
  errorCode: string;
  apiMessage?: string;
}

export const OPEN_API_ERRORS: {
  [key in OpenAPIErrors]: ErrorType;
} = {
  [OpenAPIErrors.INTERNAL_SERVER_ERROR]: {
    message: 'Internal Server Error.',
    status: 500,
    errorCode: 'API_ERR_101',
  },
  [OpenAPIErrors.FORBIDDEN_ERROR]: {
    message: 'Forbidden',
    status: 403,
    errorCode: 'API_ERR_102',
  },
  [OpenAPIErrors.VALIDATION_ERROR]: {
    message: 'Bad Request',
    status: 400,
    errorCode: 'API_ERR_103',
  },
  [OpenAPIErrors.NOT_FOUND_ERROR]: {
    message: 'The requested resource does not exist.',
    status: 404,
    errorCode: 'API_ERR_104',
  },
  [OpenAPIErrors.INVALID_API_KEY]: {
    message: 'Unauthorized',
    status: 401,
    errorCode: 'API_ERR_105',
  },
};
