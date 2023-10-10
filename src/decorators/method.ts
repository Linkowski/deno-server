// deno-lint-ignore-file ban-types
import { MethodRegistryItemOptions, Registry } from '../registry.ts';

export function Get(path = '/', options?: MethodRegistryItemOptions) {
  return Factory(path, 'GET', options);
}

export function Post(path = '/', options?: MethodRegistryItemOptions) {
  return Factory(path, 'POST', options);
}

export function Put(path = '/', options?: MethodRegistryItemOptions) {
  return Factory(path, 'PUT', options);
}

export function Delete(path = '/', options?: MethodRegistryItemOptions) {
  return Factory(path, 'DELETE', options);
}

export function Patch(path = '/', options?: MethodRegistryItemOptions) {
  return Factory(path, 'PATCH', options);
}

export function Options(path = '/', options?: MethodRegistryItemOptions) {
  return Factory(path, 'OPTIONS', options);
}

export function Head(path = '/', options?: MethodRegistryItemOptions) {
  return Factory(path, 'HEAD', options);
}

function Factory(path = '/', method = 'GET', options?: MethodRegistryItemOptions) {
  return function (target: unknown, propertyKey: string) {
    Registry.registerMethod({
      path,
      name: propertyKey,
      className: (target as Function).constructor.prototype.constructor.name,
      method,
      options,
    });
  };
}
