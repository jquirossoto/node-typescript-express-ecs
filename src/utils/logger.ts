/**
 * @file Logger
 * @author jquirossoto
 */

import winston, { LoggerOptions, Logger } from 'winston';

let level = 'info';
if (process.env.NODE_ENV === 'production') {
  level = 'warn';
}

const options: LoggerOptions = {
  silent: false,
  level: level,
  exitOnError: false,
  transports: [
    new winston.transports.Console({
      format: winston.format.combine(
        winston.format.timestamp(),
        winston.format.prettyPrint(),
        winston.format.colorize({ all: true })
      )
    })
  ]
};

const logger: Logger = winston.createLogger(options);
export default logger;
