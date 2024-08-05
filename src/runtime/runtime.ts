import { Server } from "../server/index.ts";
import { RuntimeOptions } from "./types.ts";

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
  if (options?.root) {
    const files = Array.from(Deno.readDirSync(options.root));

    for (const file of files) {
      // Skip if not a file
      if (!file.isFile) continue;
      // Skip if not a test file
      if (file.name.endsWith(".test.ts")) continue;

      // Import the file
      if (file.isFile && file.name.endsWith(".ts")) {
        try {
          await import(options.root.href + "/" + file.name);
        } catch (error) {
          console.error(error);
        }
      }
    }
  }

  const server = new Server();

  server.listen(port);
}
