import { ServerError } from '../error/index.ts';
import { HttpController, HttpEndpoint, StoreItem } from './types.ts';

/**
 * The `Store` class is used to store the controllers and endpoints.
 */
export class Store {
  private static readonly map: Map<string, StoreItem> = new Map();
  private static readonly list: Array<HttpController | HttpEndpoint> = [];

  private readonly separator = ':-:';

  /**
   * Method responsible for registering an Controller or Endpoint.
   */
  static register(object: HttpController | HttpEndpoint): void {
    Store.list.push(object);
  }

  /**
   * Method responsible for getting an item from the store based on the path and method.
   */
  get(path: string, method: string): StoreItem {
    for (const [key, item] of Store.map) {
      const [httpMethod, httpPath] = this.decodeKey(key);
      const pattern = new URLPattern({ pathname: httpPath });

      // Continue if the pattern does not match the path.
      if (!pattern.test({ pathname: path })) {
        continue;
      }

      // Continue if the method does not match the http method.
      if (httpMethod !== method) {
        continue;
      }

      // Return the item with the params.
      return {
        ...item,
        params: pattern.exec({ pathname: path })?.pathname?.groups ?? {},
      };
    }

    throw new StoreError(
      404,
      `${method} ${path} not found`,
    );
  }

  /**
   * Method responsible for merging the controllers and endpoints into the store.
   */
  merge(): void {
    const controllers: Map<string, HttpController> = new Map();
    const endpoints: HttpEndpoint[] = [];

    for (const item of Store.list) {
      if (this.isHttpEndpoint(item)) {
        endpoints.push(item);
      } else {
        controllers.set(item.classKey, item);
      }
    }

    for (const item of endpoints) {
      const controller = controllers.get(item.classKey);

      const path = controller
        ? controller.path + (item.path !== '/' ? item.path : '')
        : item.path;

      if (Store.map.has(path)) {
        throw new StoreError(
          500,
          `Path ${path} already exists in ${item.classKey}`,
        );
      }

      Store.map.set(this.encodeKey(path, item.httpMethod), {
        classRef: item.classRef,
        propertyKey: item.propertyKey,
        options: {
          ...item.options,
          ...controller?.options,
        },
        params: {},
      });
    }
  }

  /**
   * Method responsible for encoding the key.
   */
  encodeKey(path: string, method: string): string {
    return [method, path].join(this.separator);
  }

  /**
   * Method responsible for decoding the key.
   */
  decodeKey(string: string): [string, string] {
    return string.split(this.separator) as [string, string];
  }

  /**
   * Method responsible for checking if the object is an endpoint.
   */
  isHttpEndpoint(
    object: HttpController | HttpEndpoint,
  ): object is HttpEndpoint {
    return 'httpMethod' in object;
  }
}

/**
 * The `StoreError` class is used to define the error of the server store.
 */
class StoreError extends ServerError {
  constructor(code: number, message: string) {
    super(code, message, 'Store');
  }
}
