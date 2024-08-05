import {
  HttpControllerOptions,
  HttpDeleteDecorator,
  HttpEndpointControllerDecorator,
  HttpEndpointOptions,
  HttpGetDecorator,
  HttpHeadDecorator,
  HttpOptionsDecorator,
  HttpPatchDecorator,
  HttpPostDecorator,
  HttpPutDecorator,
} from './types.ts';
import { registerController, registerEndpoint } from './utils.ts';

export const Get: HttpGetDecorator = (
  path = '/',
  options?: HttpEndpointOptions,
) => {
  return registerEndpoint(path, 'GET', options);
};

export const Post: HttpPostDecorator = (
  path = '/',
  options?: HttpEndpointOptions,
) => {
  return registerEndpoint(path, 'POST', options);
};

export const Put: HttpPutDecorator = (
  path = '/',
  options?: HttpEndpointOptions,
) => {
  return registerEndpoint(path, 'PUT', options);
};

export const Delete: HttpDeleteDecorator = (
  path = '/',
  options?: HttpEndpointOptions,
) => {
  return registerEndpoint(path, 'DELETE', options);
};

export const Patch: HttpPatchDecorator = (
  path = '/',
  options?: HttpEndpointOptions,
) => {
  return registerEndpoint(path, 'PATCH', options);
};

export const Options: HttpOptionsDecorator = (
  path = '/',
  options?: HttpEndpointOptions,
) => {
  return registerEndpoint(path, 'OPTIONS', options);
};

export const Head: HttpHeadDecorator = (
  path = '/',
  options?: HttpEndpointOptions,
) => {
  return registerEndpoint(path, 'HEAD', options);
};

export const Controller: HttpEndpointControllerDecorator = (
  path = '/',
  options?: HttpControllerOptions,
) => {
  return registerController(path, options);
};
