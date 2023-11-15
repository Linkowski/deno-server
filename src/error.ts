export class ServerError extends Error {
  constructor(
    public readonly message: string,
    public readonly code: number = 500,
  ) {
    super(message);
  }

  static isServerError(error: Error): error is ServerError {
    return error instanceof ServerError;
  }
}
