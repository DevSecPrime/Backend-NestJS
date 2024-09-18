export class GenerelException extends Error {
  status: number;
  constructor(message?: string, status?: number) {
    super(message);
    this.message = message || 'Internal Server Error';
    this.status = status || 500;
  }
}
