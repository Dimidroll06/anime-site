const { createLogger, format, transports } = require('winston');
const { combine, timestamp, printf } = format;
const DailyRotateFile = require('winston-daily-rotate-file');

const logFormat = printf(({ level, message, timestamp, label }) => {
    return `${timestamp} [${level.toUpperCase()}] [${label || 'Main'}]: ${message}`;
});

const fileTransports = new DailyRotateFile({
    filename: 'logs/application-%DATE%.log',
    datePattern: 'YYYY-MM-DD',
    zippedArchive: true,
    maxSize: '20m',
    maxFiles: '30d',
    frequency: 'weekly'
});

const consoleTransports = new transports.Console({
    level: 'debug',
    handleExceptions: true,
    handleRejections: true,
});

const logger = createLogger({
    level: 'debug',
    format: combine(
        timestamp(),
        logFormat
    ),
    transports: [
        fileTransports,
        consoleTransports
    ],
    exitOnError: false
});

const createModuleLogger = (label) => {
    return logger.child({ label: label });
}

module.exports = {
    logger,
    createModuleLogger
};