import winston from 'winston';
import winstonGraylog2 from 'winston-graylog2';

if (process.env.NODE_ENV !== 'development') {
  const options = {
    name: process.env.GRAYLOG_NAME, // Transport Name DON'T TOUCH
    level: process.env.GRAYLOG_LEVEL, // The minimun level that this transport should log
    silent: false,
    handleExceptions: false,
    prelog: (msg) => msg.trim(),
    graylog: {
      servers: [{ host: process.env.GRAYLOG_HOST, port: process.env.GRAYLOG_PORT }], // Graylog server data
      facility: process.env.APP_NAME, // APP NAME
      bufferSize: 1400, // DON'T TOUCH
    },
    staticMeta: { env: process.env.NODE_ENV }, // Pass some meta to differentiate messages
  };

  winston.add(winstonGraylog2, options);
}

global.logger = winston;
