import { HttpStatus } from '@nestjs/common';
import { GenerelException } from './generel.exception';

export class UnProcessibleException extends GenerelException {
  constructor(message?: string) {
    super(
      (message = message || 'Unprocessible'),
      HttpStatus.UNPROCESSABLE_ENTITY || 422,
    );
  }
}
