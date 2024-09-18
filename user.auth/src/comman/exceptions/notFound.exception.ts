import { HttpException, HttpStatus } from '@nestjs/common';

export class NOTFoundException extends HttpException {
  constructor(message?: string) {
    super((message = message || 'Not Found.'), HttpStatus.NOT_FOUND || 404);
  }
}
