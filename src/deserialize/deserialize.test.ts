import { assertEquals, assertExists } from 'testing/asserts.ts';
import { Deserialize } from './deserialize.ts';

Deno.test('Deserialize util', async ({ step }) => {
  await step(
    'isJsonContentType should return true for a request with JSON content type',
    () => {
      const request = new Request('https://example.com', {
        headers: { 'Content-Type': 'application/json' },
      });

      const result = Deserialize.isJsonContentType(request);

      assertEquals(result, true, 'Result should be true.');
    },
  );

  await step(
    'isJsonContentType should return false for a request without JSON content type',
    () => {
      const request = new Request('https://example.com');

      const result = Deserialize.isJsonContentType(request);

      assertEquals(result, false, 'Result should be false.');
    },
  );

  await step(
    'isJsonContentType should return false for a request with non-JSON content type',
    () => {
      const request = new Request('https://example.com', {
        headers: { 'Content-Type': 'text/plain' },
      });

      const result = Deserialize.isJsonContentType(request);

      assertEquals(result, false, 'Result should be false.');
    },
  );

  await step(
    'should not deserialize for a request without body string',
    async () => {
      const request = new Request('https://example.com');
      const result = await Deserialize.string(request);

      assertEquals(result, undefined, 'Result should not be defined.');
    },
  );

  await step('should deserialize valid string body', async () => {
    const body = 'Hello, world!';
    const request = new Request('https://example.com', {
      method: 'POST',
      body,
    });
    const result = await Deserialize.string(request);

    assertExists(result, 'Result should be defined.');
    assertEquals(result, body, 'Result should be the same as body.');
  });

  await step(
    'should not deserialize for a request with invalid body string',
    async () => {
      const request = new Request('https://example.com', {
        method: 'POST',
        body: null,
      });
      const result = await Deserialize.string(request);

      assertEquals(result, undefined, 'Result should not be defined.');
    },
  );

  await step(
    'should not deserialize for an request without body json',
    async () => {
      const request = new Request('https://example.com');
      const result = await Deserialize.json(request);

      assertEquals(result, undefined, 'Result should not be defined.');
    },
  );

  await step(
    'should not deserialize for an request invalid body json',
    async () => {
      const request = new Request('https://example.com', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: 'invalid',
      });
      const result = await Deserialize.json(request);

      assertEquals(result, undefined, 'Result should not be defined.');
    },
  );

  await step('should deserialize valid JSON', async () => {
    const body = { foo: 'bar', baz: 'qux' };
    const request = new Request('https://example.com', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    });
    const result = await Deserialize.json(request);

    assertExists(result, 'Result should be defined.');
    assertEquals(result, body, 'Result should be the same as body.');
  });

  await step(
    'should not deserialize for an request without search params',
    () => {
      const request = new Request('https://example.com');
      const result = Deserialize.searchParams(request);

      assertEquals(result, undefined, 'Result should not be defined.');
    },
  );

  await step('should deserialize valid search params', () => {
    const body = { foo: 'bar', baz: 'qux' };
    const request = new Request(
      'https://example.com?' + new URLSearchParams(body).toString(),
    );
    const result = Deserialize.searchParams(request);

    assertExists(result, 'Result should be defined.');
    assertEquals(result, body, 'Result should be the same as body.');
  });
});
