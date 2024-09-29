import {
  ArgumentsHost,
  BadRequestException,
  Catch,
  ExceptionFilter,
  HttpException,
  InternalServerErrorException,
  Logger,
} from '@nestjs/common';
import { OpenApiError } from '../errors/open-api-error';
import { OPEN_API_ERRORS } from '../errors/open-api.errors';

@Catch()
export class AllExceptionFilter implements ExceptionFilter {
  private readonly logger = new Logger(AllExceptionFilter.name);

  catch(error: any, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const res = ctx.getResponse();
    if (error instanceof BadRequestException) {
      res.status(error.getStatus()).json({
        timestamp: new Date().toISOString(),
        message: (error.getResponse() as any).message,
        errorCode: OPEN_API_ERRORS.VALIDATION_ERROR.errorCode,
      });
    } else if (
      error instanceof HttpException &&
      !(error instanceof InternalServerErrorException)
    ) {
      const message =
        error.getResponse() instanceof String
          ? error.getResponse()
          : (error.getResponse() as any).message;
      res.status(error.getStatus()).json({
        timestamp: new Date().toISOString(),
        message,
      });
    } else if (error instanceof OpenApiError) {
      res.status(error.status).json({
        message: error.message,
        errorCode: error.errorCode,
        timestamp: new Date().toISOString(),
      });
    } else {
      this.logger.error('Unhandled error:', error.stack);
      res.status(OPEN_API_ERRORS.INTERNAL_SERVER_ERROR.status).json({
        message: OPEN_API_ERRORS.INTERNAL_SERVER_ERROR.message,
        timestamp: new Date().toISOString(),
      });
    }
  }
}
