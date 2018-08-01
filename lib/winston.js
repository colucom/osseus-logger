const winston = require('winston')
const cluster = require('cluster')
const os = require('os')

const formatter = winston.format.printf(info => {
  const formatError = (obj) => {
    return obj.stack || obj.message || obj.toString()
  }

  const formatObject = (obj) => {
    return JSON.stringify(obj)
  }

  const hostname = os.hostname()
  const pid = cluster.worker && cluster.worker.process.pid ? cluster.worker.process.pid : process.pid
  const prefix = `${info.timestamp} - ${info.level}: (${hostname}) (${pid})`

  info.meta = info[Symbol.for('splat')]
  if (info.meta && info.meta.length) {
    info.meta = info.meta.map(item => {
      let isError = item instanceof Error
      let isObject = typeof item === 'object'
      return isError ? formatError(item) : isObject ? formatObject(item) : item
    })
    return `${prefix} - ${info.message} ${info.meta}`
  }
  return `${prefix} - ${info.message}`
})

module.exports = function (config) {
  const env = config.env && config.env.toLowerCase()
  let logger

  switch (env) {
    case 'local':
    case 'dev':
    case 'development':
      logger = winston.createLogger({
        level: 'silly',
        format: winston.format.combine(
          winston.format.timestamp(),
          winston.format.colorize(),
          winston.format.splat(),
          formatter
        ),
        transports: [new winston.transports.Console()],
        exitOnError: true
      })
      break
    case 'qa':
      logger = winston.createLogger({
        level: 'debug',
        format: winston.format.combine(
          winston.format.timestamp(),
          winston.format.splat(),
          formatter
        ),
        transports: [new winston.transports.Console()],
        exitOnError: false
      })
      break
    case 'prod':
    case 'production':
      logger = winston.createLogger({
        level: 'info',
        format: winston.format.combine(
          winston.format.timestamp(),
          winston.format.splat(),
          formatter
        ),
        transports: [new winston.transports.Console()],
        exitOnError: false
      })
      break
    default:
      logger = winston.createLogger({
        level: 'debug',
        format: winston.format.combine(
          winston.format.timestamp(),
          winston.format.splat(),
          formatter
        ),
        transports: [new winston.transports.Console()],
        exitOnError: false
      })
  }

  logger.level = (config.osseus_logger && config.osseus_logger.log_level) || logger.level

  // console.debug = logger.debug
  // console.log = logger.debug
  // console.info = logger.info
  // console.warn = logger.warn
  // console.error = logger.error

  return logger
}
