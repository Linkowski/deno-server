// deno-lint-ignore-file ban-types

interface ClassRegistryItem {
  path: string;
  className: string;
  target: Function;
}

interface MethodRegistryItem {
  path: string;
  name: string;
  className: string;
  method: string;
  options?: MethodRegistryItemOptions;
}

interface RegistryItem {
  path: string;
  target: Function;
  methodName: string;
  method: string;
  options?: MethodRegistryItemOptions;
}

export interface MethodRegistryItemOptions {
  /**
   * If set to true, the response will be returned without any modifications.
   *
   * Return type of method should be `Response`.
   */
  raw: boolean;
}

export class Registry {
  private static classes = new Map<string, ClassRegistryItem>();
  private static methods = new Map<string, MethodRegistryItem>();
  private static items = new Map<string, RegistryItem>();

  public static load() {
    Registry.merge();

    console.table(Array.from(Registry.items.values()));
  }

  public static registerClass(item: ClassRegistryItem) {
    if (Registry.classes.has(item.path)) {
      throw new Error(
        `Path ${item.path} in ${item.target.prototype.constructor.name} already exists`,
      );
    }

    Registry.classes.set(item.className, item);
  }

  public static registerMethod(item: MethodRegistryItem) {
    if (Registry.methods.has(Registry.createKey(item.className, item.name, item.method))) {
      throw new Error(
        `Path ${item.path} in ${item.className} already exists`,
      );
    }

    Registry.methods.set(Registry.createKey(item.className, item.name, item.method), item);
  }

  public static get(
    path: string,
    method: string,
  ): RegistryItem & { params: Record<string, string | undefined> | null } {
    for (const [key, item] of Registry.items) {
      const pattern = new URLPattern({ pathname: key.slice(key.indexOf('/')) });

      if (pattern.test({ pathname: path })) {
        if (item.method !== method) {
          continue;
        }

        return { ...item, params: pattern.exec({ pathname: path })?.pathname?.groups ?? null };
      }
    }

    throw new Error(`Path ${path} not found`);
  }

  private static merge() {
    Registry.methods.forEach((item) => {
      const classRef = Registry.classes.get(item.className);

      if (!classRef) {
        return;
      }

      const path = Registry.createPath(item.method, classRef.path, item.path);

      if (Registry.items.has(path)) {
        throw new Error(`Path ${path} already exists`);
      }

      Registry.items.set(path, {
        path: path,
        target: classRef.target,
        methodName: item.name,
        method: item.method,
        options: item.options,
      });
    });

    Registry.classes.clear();
    Registry.methods.clear();
  }

  private static createKey(...args: string[]): string {
    return args.join('.');
  }

  private static createPath(...args: string[]): string {
    return args.filter((i) => i !== '/').join('/');
  }
}
