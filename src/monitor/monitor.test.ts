import { assertEquals } from 'testing/asserts.ts';
import { spy } from 'testing/mock.ts';

import { Monitor } from './monitor.ts';

Deno.test('Monitor', async ({ step }) => {
  const scope = 'testScope';
  const timestamp = Date.now();
  const formatDate = new Date(timestamp).toLocaleString('en-US');
  const monitor = new Monitor(scope, timestamp, 'en-US');

  await step('should log LOG message', () => {
    const consoleInfoSpy = spy(console, 'log');

    monitor.log('Log message');

    assertEquals(consoleInfoSpy.calls.length, 1);
    assertEquals(consoleInfoSpy.calls[0].args, [
      `[${formatDate}] [LOG] [${scope}] Log message`,
    ]);
  });

  await step('should log INFO message', () => {
    const consoleInfoSpy = spy(console, 'info');

    monitor.info('Info message');

    assertEquals(consoleInfoSpy.calls.length, 1);
    assertEquals(consoleInfoSpy.calls[0].args, [
      `[${formatDate}] [INFO] [${scope}] Info message`,
    ]);
  });

  await step('should log WARNING message', () => {
    const consoleWarnSpy = spy(console, 'warn');

    monitor.warning('Warning message');

    assertEquals(consoleWarnSpy.calls.length, 1);
    assertEquals(consoleWarnSpy.calls[0].args, [
      `[${formatDate}] [WARNING] [${scope}] Warning message`,
    ]);
  });

  await step('should log ERROR message', () => {
    const consoleErrorSpy = spy(console, 'error');

    monitor.error('Error message');

    assertEquals(consoleErrorSpy.calls.length, 1);
    assertEquals(consoleErrorSpy.calls[0].args, [
      `[${formatDate}] [ERROR] [${scope}] Error message`,
    ]);
  });

  await step('should log DEBUG message', () => {
    const consoleDebugSpy = spy(console, 'debug');

    monitor.debug('Debug message');

    assertEquals(consoleDebugSpy.calls.length, 1);
    assertEquals(consoleDebugSpy.calls[0].args, [
      `[${formatDate}] [DEBUG] [${scope}] Debug message`,
    ]);
  });
});
