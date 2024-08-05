import { Server } from '../server/index.ts';
import { RuntimeOptions } from './types.ts';

/**
 * The `runtime` function is used to start the server.
 *
 * @param port - The port to listen on
 */
export async function runtime(
  port?: number,
  options?: RuntimeOptions,
): Promise<void> {
  // Load files from the controllers directory
  if (options?.controllers) {
    const controllerPath = Deno.realPathSync(options.controllers);

    // real path is used to get the absolute path of the controllers directory
    const files = Array.from(
      Deno.readDirSync(
        Deno.cwd() + controllerPath
      )
    );

    for (const file of files) {
      // and ignore files with .test.ts extension
      if (file.isFile && file.name.endsWith('.ts') && !file.name.endsWith('.test.ts')) {
        await import(`${controllerPath}/${file.name}`);
      }
    }
  }

  const server = new Server();

  server.listen(port);
}
