/**
 * All annotations for class:
 * - @Controller(path)
 * - @Use() // for middleware -> will execute middleware before every method.
 * - @Cookie(key, value, options) // for cookie -> will set cookie to response.
 * - @Header(key, value) // for header -> will set header to response.
 *
 * All annotations for method:
 * - @Get(path)
 * - @Post(path)
 * - @Put(path)
 * - @Delete(path)
 * - @Patch(path)
 * - @Options(path)
 * - @Debug() // for debugging -> will console.log request and response from method.
 * - @Use() // for middleware -> will execute middleware before method.
 * - @Cookie(key, value, options) // for cookie -> will set cookie to response.
 *
 * - @Redirect(url, code)
 * = @Header(key, value)
 * - @HttpCode(code)
 *
 * All annotations for parameter:
 * - @Param(key) -> key: string
 * - @Body() -> body: unknown
 * - @Query() -> key: string
 * - @Request() -> request: Request
 * - @Response() -> response: Response
 * - @Cookies() -> cookies: Cookies
 * - @Validate(validationFn) -> validationFn: (value: unknown) => boolean. If validationFn return false, it will throw error.
 * - @Validate(validationFn, { save: boolean }) -> isValidated: boolean, validationFn: (value: unknown) => boolean. If validationFn return false, without error, it will set isValidated to false.
 */
