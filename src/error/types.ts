/**
 * The BaseError abstract class is used to define the default error of the application.
 */
export abstract class BaseError {
  /**
   * The code of the error.
   *
   * Can provide more information about the error.
   * For example: 404, 500, 401, 403, 400, 422, 429, 503, 504 for HTTP errors
   */
  public abstract readonly code: number;

  /**
   * The message of the error.
   *
   * Can be visible for the user.
   */
  public abstract readonly message: string;
}
