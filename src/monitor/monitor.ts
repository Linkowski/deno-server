import { BaseMonitor, MonitorType } from './types.ts';

/**
 * The `Monitor` class allows to monitor the application,
 * log messages, errors, warnings, etc.
 */
export class Monitor implements BaseMonitor {
  constructor(
    private readonly scope: string,
    private readonly timestamp: number = Date.now(),
    private readonly locale: string = 'en-US',
  ) {}

  public log(message: string): void {
    console.log(this.toString(MonitorType.LOG, message));
  }

  public error(message: string): void {
    console.error(
      '\x1b[31m%s\x1b[0m',
      this.toString(MonitorType.ERROR, message),
      '\x1b[0m',
    );
  }

  public warning(message: string): void {
    console.warn(
      '\x1b[33m%s\x1b[0m',
      this.toString(MonitorType.WARNING, message),
      '\x1b[0m',
    );
  }

  public info(message: string): void {
    console.info(this.toString(MonitorType.INFO, message));
  }

  public debug(message: string): void {
    console.debug(
      '\x1b[34m%s\x1b[0m',
      this.toString(MonitorType.DEBUG, message),
      '\x1b[0m',
    );
  }

  public toString(type: MonitorType, message: string): string {
    const timestamp = new Date(this.timestamp).toLocaleString(this.locale);

    return `[${timestamp}] [${type.toUpperCase()}] [${this.scope}] ${message}`;
  }
}
