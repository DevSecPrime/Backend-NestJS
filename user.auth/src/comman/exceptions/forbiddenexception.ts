import { HttpStatus } from '@nestjs/common';
import { GenerelException } from './generel.exception';
export class ForbiddenException extends GenerelException {
  constructor(message?: string) {
    super((message = message || 'Forbidden.'), HttpStatus.FORBIDDEN || 403);
  }
}
