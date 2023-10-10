// deno-lint-ignore-file ban-types
import { Registry } from '../registry.ts';

export function Controller(controllerPath = '/') {
  return function (target: Function) {
    Registry.registerClass({
      path: controllerPath,
      className: target.prototype.constructor.name,
      target,
    });
  };
}
