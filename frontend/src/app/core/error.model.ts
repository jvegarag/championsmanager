export class Error {
  message: string;
  errors: string[];

  constructor(message: string) {
    this.message = message;
  }
}
