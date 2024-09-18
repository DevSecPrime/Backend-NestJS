import { HttpStatus } from '@nestjs/common';
import { GenerelException } from './generel.exception';

export class UnauthorisedException extends GenerelException {
  constructor(message?: string) {
    super(
      (message = message || 'Unauthorised'),
      HttpStatus.UNAUTHORIZED || 401,
    );
  }
}
