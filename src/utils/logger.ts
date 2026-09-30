/**
 * Logger
 * Thin wrapper around console that is silenced outside development
 */

import { config } from '@/config/environment';

type LogArgs = unknown[];

export const logger = {
  info: (...args: LogArgs) => {
    if (config.enableLogging) {
      console.log('[INFO]', ...args);
    }
  },
  warn: (...args: LogArgs) => {
    if (config.enableLogging) {
      console.warn('[WARN]', ...args);
    }
  },
  error: (...args: LogArgs) => {
    if (config.enableLogging) {
      console.error('[ERROR]', ...args);
    }
  },
};

export default logger;
