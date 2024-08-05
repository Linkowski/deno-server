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
    const controllerPath = new URL(options.controllers, import.meta.url).href;
    const files = Array.from(Deno.readDirSync(controllerPath.replace('file://', '')));

    for (const file of files) {
      // and ignore files with .test.ts extension
      if (file.isFile && file.name.endsWith('.ts') && !file.name.endsWith('.test.ts')) {
        const filePath = controllerPath + '/' + file.name

        console.log('filePath', filePath);

        await import(filePath);
      }
    }
  }

  const server = new Server();

  server.listen(port);
}
