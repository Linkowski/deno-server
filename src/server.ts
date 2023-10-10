import { Registry } from './registry.ts';

export interface ServerMethodContext {
  request: Request;
  params: Record<string, unknown | undefined> | null;
}

export class Server {
  constructor() {}

  public async handleRequest(request: Request): Promise<Response> {
    const url = new URL(request.url);
    const item = Registry.get(url.pathname, request.method);
    const controller = Reflect.construct(item.target, [item.params || {}]);
    const func = controller[item.methodName];
    const response = await func.call(
      controller,
      {
        request,
        // TODO: Add support for more params and pass if decorators are used.
        params: item.params,
        // body: await request.json(), // TODO: check if body is present and parse it
        // end todo
      } satisfies ServerMethodContext,
    );

    if (item.options?.raw) {
      return response;
    }

    // TODO: Add support for more response types
    return new Response(JSON.stringify(response), {
      status: 200,
      headers: {
        'content-type': 'application/json',
      },
    });
  }
}
