// The `SafeFunction` type is a wrapper around the `Function` type.
// deno-lint-ignore ban-types
export type SafeFunction = Function;

// The `SafeObject` type is a wrapper around the `Object` type.
// deno-lint-ignore ban-types
export type SafeObject = Object;

/**
 * Context is the object passed to the endpoint method, containing request, params, body, and headers.
 */
export interface Context<
  Body = Record<string, unknown | undefined> | string | undefined,
  Params = Record<string, unknown | undefined> | string | undefined,
  SearchParams= Record<string, unknown | undefined> | string | undefined,
> {
  request: Request;
  params: Params;
  searchParams: SearchParams;
  body: Body;
  headers: Headers;
}

/**
 * The `StoreItem` interface represents an item in the store.
 */
export interface StoreItem {
  classRef: SafeFunction;
  propertyKey: string;
  options?: Partial<HttpControllerOptions & HttpEndpointOptions>;
  params: Record<string, string | undefined>;
}

/**
 * The `HttpController` interface represents a controller.
 */
export interface HttpController {
  path: string;
  classKey: string;
  options?: HttpControllerOptions;
}

/**
 * The `HttpEndpoint` interface represents an endpoint.
 */
export interface HttpEndpoint {
  path: string;
  httpMethod: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH' | 'OPTIONS' | 'HEAD';
  propertyKey: string;
  classRef: SafeFunction;
  classKey: string;
  options?: HttpEndpointOptions;
}

/**
 * The `HttpControllerOptions` interface represents the options for an endpoint.
 */
export interface HttpControllerOptions {
  // For development purposes.
  arg: unknown;
}

/**
 * The `HttpEndpointOptions` interface represents the options for an endpoint.
 */
export interface HttpEndpointOptions {
  /**
   * If set to true, the response will be returned without any modifications.
   *
   * Return type of method should be `Response`.
   */
  raw: boolean;
}

// The `HttpDecorator` type represents a decorator.
export type HttpDecorator<A, B> = (
  path?: string,
  options?: A,
) => B;

// The `HttpEndpointControllerDecorator` type represents the controller decorator.
// This is the base type for all controller decorators.
export type HttpEndpointControllerDecorator = HttpDecorator<
  HttpControllerOptions,
  ClassDecorator
>;

// The `HttpEndpointDecorator` type represents the endpoint decorator.
// This is the base type for all endpoint decorators.
export type HttpEndpointDecorator = HttpDecorator<
  HttpEndpointOptions,
  MethodDecorator
>;

// The `HttpGetDecorator` type represents the http method `Get`.
export type HttpGetDecorator = HttpEndpointDecorator;

// The `HttpPostDecorator` type represents the http method `Post`.
export type HttpPostDecorator = HttpEndpointDecorator;

// The `HttpPutDecorator` type represents the http method `Put`.
export type HttpPutDecorator = HttpEndpointDecorator;

// The `HttpDeleteDecorator` type represents the http method `Delete`.
export type HttpDeleteDecorator = HttpEndpointDecorator;

// The `HttpPatchDecorator` type represents the http method `Patch`.
export type HttpPatchDecorator = HttpEndpointDecorator;

// The `HttpOptionsDecorator` type represents the http method `Options`.
export type HttpOptionsDecorator = HttpEndpointDecorator;

// The `HttpHeadDecorator` type represents the http method `Head`.
export type HttpHeadDecorator = HttpEndpointDecorator;
