/**
 * Utility class for deserializing request data.
 */
export class Deserialize {
  /**
   * Check if the content type of a request is JSON.
   *
   * @param request - The request object to check the content type of.
   * @returns A boolean indicating whether the content type is JSON.
   */
  static isJsonContentType(request: Request): boolean {
    const contentType = request.headers.get('content-type');

    return contentType?.includes('application/json') ?? false;
  }

  /**
   * Deserialize the JSON body of a request into a TypeScript object.
   *
   * @param request - The request object to deserialize.
   * @returns A promise that resolves to the deserialized object, or undefined if the deserialization fails.
   * @template T - The generic type of the object to deserialize the request body into.
   */
  static async json<T = Record<string, unknown>>(
    request: Request,
  ): Promise<T | undefined> {
    try {
      const data = await request.json();

      return data as T;
    } catch (_) {
      return undefined;
    }
  }

  /**
   * Deserialize the body of a request into a string.
   *
   * @param request - The request object to deserialize.
   * @returns A promise that resolves to the deserialized string, or undefined if the deserialization fails.
   */
  static async string(request: Request): Promise<string | undefined> {
    try {
      const data = await request.text();
      return data !== '' ? data : undefined;
    } catch (_) {
      return undefined;
    }
  }

  /**
   * Extracts the search parameters from a Request object and returns them as a typed object.
   *
   * @template T - The type of the returned object.
   * @param {Request} request - The Request object to extract search parameters from.
   * @returns {T | undefined} - The extracted search parameters as a typed object, or undefined if the URL is invalid.
   */
  static searchParams<T = Record<string, unknown>>(
    request: Request,
  ): T | undefined {
    try {
      const data = new URL(request.url).searchParams;
      const result: Record<string, unknown> = {};

      for (const [key, value] of data.entries()) {
        result[key] = value;
      }

      if (Object.keys(result).length === 0) {
        return undefined;
      }

      return result as T;
    } catch (_) {
      return undefined;
    }
  }
}
