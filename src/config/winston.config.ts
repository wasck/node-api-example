import * as winston from 'winston';
const { combine, timestamp, label, printf } = winston.format;


/* tslint:disable-next-line */
const customFormat = printf(({ level, message, label, timestamp }) => {
    return `${timestamp} [${label}] ${level}: ${message}`;
});

const Logger = winston.createLogger({
    transports: [
        new winston.transports.Console()
    ],
    format: winston.format.combine(
        winston.format.timestamp(),
        winston.format.json(),
        customFormat
    )
});

export = Logger;