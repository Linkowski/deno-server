import { Store } from './store.ts';
import {
  HttpController,
  HttpControllerOptions,
  HttpEndpoint,
  HttpEndpointOptions,
  SafeFunction,
  SafeObject,
} from './types.ts';

/**
 * Utility function to register an endpoint.
 */
export function registerEndpoint(
  path: string,
  httpMethod: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH' | 'OPTIONS' | 'HEAD',
  options?: HttpEndpointOptions,
): MethodDecorator {
  return function (target: SafeObject, key: string | symbol) {
    const endpoint = {
      classRef: target.constructor.prototype.constructor as SafeFunction,
      classKey: target.constructor.prototype.constructor.name,
      httpMethod,
      options,
      path: path.at(0) === '/' ? path : `/${path}`,
      propertyKey: key.toString(),
    } satisfies HttpEndpoint;

    Store.register(endpoint);
  };
}

/**
 * Utility function to register a controller.
 */
export function registerController(
  path: string,
  options?: HttpControllerOptions,
): ClassDecorator {
  return function (target: SafeFunction) {
    const controller = {
      classKey: target.name,
      path: path.at(0) === '/' ? path : `/${path}`,
      options,
    } satisfies HttpController;

    Store.register(controller);
  };
}

// TODO: - Use the following utility functions to safely deserialize request bodies and query params.
/**
 * Safely deserialize a request body as JSON.
 *
 * @param request The request to deserialize.
 * @returns The deserialized request body as JSON or `undefined` if the request body is not valid JSON.
 */
export async function safelyDeserializeRequestJson<T = Record<string, unknown>>(
  request: Request,
): Promise<T | undefined> {
  try {
    const data = await request.json();

    return data as T;
  } catch (_error) {
    // TODO: Track Error.
    return undefined;
  }
}

/**
 * Safely deserialize a request Query Params.
 *
 * @param request The request to deserialize.
 * @returns The deserialized request Query Params or `undefined` if the request Query Params is not valid.
 */
export function safelyDeserializeRequestQueryParams<
  T = Record<string, unknown>,
>(
  request: Request,
): T | undefined {
  try {
    const data = new URL(request.url).searchParams;
    const result: Record<string, unknown> = {};

    for (const [key, value] of data.entries()) {
      result[key] = value;
    }

    return result as T;
  } catch (_error) {
    // TODO: Track Error.
    return undefined;
  }
}
