import { Deserialize } from '../deserialize/index.ts';
import { ServerError } from '../error/error.ts';
import { Monitor } from '../monitor/index.ts';
import { Store } from './store.ts';
import { Context } from './types.ts';

export class Server {
  private server: Deno.HttpServer | undefined;

  constructor(
    private readonly store = new Store(),
    private readonly monitor = new Monitor('Server'),
  ) {}

  listen(port: number | undefined): void {
    this.store.merge();

    this.server = Deno.serve(this.serverInit(port), (request) => this.handleRequest(request));

    this.server.finished.finally(() => {
      this.monitor.info('Server closed');
    });
  }

  close(): void {
    this.server?.shutdown();
  }

  private async handle(request: Request): Promise<Response> {
    const pathname = new URL(request.url).pathname;
    const method = request.method;
    const item = this.store.get(pathname, method);
    const controller = Reflect.construct(item.classRef, []);
    const func = controller[item.propertyKey];
    const response = await func.call(
      controller,
      {
        // The request object
        request,
        // The parameters of the request:
        // /:name -> { name: 'value' }, /:name/:id -> { name: 'value', id: 'value' }
        params: item.params,

        // The search parameters of the request:
        // ?name=value -> { name: 'value' }, ?name=value&name2=value2 -> { name: 'value', name2: 'value2' }
        searchParams: Deserialize.searchParams(request) ?? {},

        // The body of the request, either a JSON object or a string
        body: Deserialize.isJsonContentType(request)
          ? await Deserialize.json(request)
          : await Deserialize.string(request),

        // The headers of the request
        headers: request.headers,
      } satisfies Context,
    );

    this.monitor.info(`Handling ${method} request for ${pathname}`);

    if (item.options?.raw) {
      return response;
    }

    if (response instanceof Object) {
      return new Response(JSON.stringify(response), {
        status: 200,
        headers: {
          'content-type': 'application/json',
        },
      });
    } else {
      return new Response(response, { status: 200 });
    }
  }

  private async handleRequest(request: Request): Promise<Response> {
    try {
      const response = await this.handle(request);

      return response;
    } catch (error) {
      if (ServerError.isServerError(error)) {
        return new Response(error.message, { status: error.code });
      } else {
        return new Response('Internal Server Error', { status: 500 });
      }
    }
  }

  private serverInit(
    port: number | undefined,
  ): Deno.ServeTcpOptions {
    return {
      port,
      onListen: ({ port }) => this.monitor.info(`Listening on port ${port}`),
    };
  }
}
