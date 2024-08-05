import { assertEquals } from 'testing/asserts.ts';
import { ServerError } from './error.ts';

Deno.test('Server Error', async ({ step }) => {
  await step(
    'should create a new server error with default values',
    () => {
      const error = new ServerError();

      assertEquals(error.code, 500);
      assertEquals(error.message, 'Server error');
    },
  );

  await step('should create a new server error', () => {
    const error = new ServerError(500, 'Server error');

    assertEquals(error.code, 500);
    assertEquals(error.message, 'Server error');
  });

  await step('should check if error is a server error', () => {
    const error = new ServerError();

    assertEquals(ServerError.isServerError(error), true);
  });

  await step('should check if error is not a server error', () => {
    const error = new Error('Error');

    assertEquals(ServerError.isServerError(error), false);
  });
});
