import { Monitor } from '../monitor/index.ts';
import { BaseError } from './types.ts';

/**
 * The `ServerError` class is used to define the error of the server.
 *
 * Should be used to handle errors that occur on the server side.
 *
 * Can be used to extend to create custom errors,
 * like `AuthenticationError`, `AuthorizationError`,
 * or for services like `DatabaseError`.
 *
 * By default all errors are logged to the console,
 * and requests are terminated with a given status code and message.
 *
 * example:
 * ```ts
 * class DatabaseError extends ServerError {
 *  constructor(code: number, message: string) {
 *   super(code, message, 'Database');
 *  }
 * }
 * ```
 */
export class ServerError extends Error implements BaseError {
  constructor(
    public readonly code: number = 500,
    public readonly message: string = 'Server error',
    public readonly scope: string = 'Server',
    private readonly monitor = new Monitor(scope),
  ) {
    super(message);
    this.monitor.error(message);
  }

  /**
   * Helper function to check if the error is a `ServerError`.
   *
   * @param error - The error to check
   * @returns `true` if the error is a `ServerError`, otherwise `false`
   */
  static isServerError(error: Error): error is ServerError {
    return error instanceof ServerError;
  }
}
