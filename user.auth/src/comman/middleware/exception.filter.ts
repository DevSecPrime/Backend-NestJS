import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { Response } from 'express';
import { GenerelException } from '../exceptions/generel.exception'; // Adjust the path as needed

@Catch() // This will catch all types of exceptions
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    // const request = ctx.getRequest<Request>();
    const status =
      exception instanceof HttpException
        ? exception.getStatus()
        : HttpStatus.INTERNAL_SERVER_ERROR;

    // Handle GeneralException
    if (exception instanceof GenerelException) {
      return response.status(status).json({
        status: status || HttpStatus.INTERNAL_SERVER_ERROR,
        success: false,
        message: exception.message || 'Something went wrong',
      });
    }

    // Handle Joi validation errors
    // if (exception && (exception as any).error?.isJoi) {
    //   const details = (exception as any).error.details[0];
    //   return response.status(HttpStatus.UNPROCESSABLE_ENTITY).json({
    //     success: false,
    //     status: HttpStatus.UNPROCESSABLE_ENTITY,
    //     message: details ? details.message : 'Validation error',
    //   });
    // }

    // Handle HttpExceptions
    if (exception instanceof HttpException) {
      const responseBody = exception.getResponse();
      return response.status(status).json({
        status,
        success: false,
        message:
          typeof responseBody === 'string'
            ? responseBody
            : (responseBody as any).message || 'Error occurred',
      });
    }

    // Handle all other errors
    return response.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
      status: HttpStatus.INTERNAL_SERVER_ERROR,
      success: false,
      error: (exception as any).message || 'An unknown error occurred',
      message: 'Internal Server Error',
    });
  }
}
