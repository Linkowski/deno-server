/**
 * The `MonitorType` enum defines the type of an event.
 */
export enum MonitorType {
  INFO = 'info',
  WARNING = 'warning',
  ERROR = 'error',
  DEBUG = 'debug',
  LOG = 'log',
}

/**
 * The `MonitorEvent` interface defines the structure of an event.
 *
 * Every event is registered in `Monitor`.
 */
export interface MonitorEvent {
  type: MonitorEvent;
  message: string;
  timestamp: number;
}

/**
 * The `Monitor` abstract class defines the structure of a monitor.
 *
 * It is used to monitor the application and to store information about errors, warnings, etc.
 */
export abstract class BaseMonitor {
  /**
   * Logs a message to the monitor.
   *
   * @param message - The message to log.
   */
  abstract log(message: string): void;

  /**
   * Logs an error message to the monitor.
   *
   * @param message - The error message to log.
   */
  abstract error(message: string): void;

  /**
   * Logs a warning message to the monitor.
   *
   * @param message - The warning message to log.
   */
  abstract warning(message: string): void;

  /**
   * Logs an information message to the monitor.
   *
   * @param message - The information message to log.
   */
  abstract info(message: string): void;

  /**
   * Logs a debug message to the monitor.
   *
   * @param message - The debug message to log.
   */
  abstract debug(message: string): void;
  /**
   * The `toString` method returns a string representing the specified `Monitor` object.
   */
  abstract toString(type: MonitorType, message: string): string;
}
