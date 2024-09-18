import { HttpStatus, HttpException } from '@nestjs/common';
export class BADRequestException extends HttpException {
  constructor(message?: string) {
    super((message = message || 'Bad Request'), HttpStatus.BAD_REQUEST || 400);
  }
}
