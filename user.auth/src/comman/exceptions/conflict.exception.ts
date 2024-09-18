import { HttpException, HttpStatus } from '@nestjs/common';
// import { GenerelException } from './generel.exception';

export class ConflictException extends HttpException {
  constructor(message?: string) {
    super((message = message || 'Conflit'), HttpStatus.CONFLICT || 409);
  }
}
