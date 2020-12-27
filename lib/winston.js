const winston = require('winston')
const cluster = require('cluster')
const os = require('os')
const util = require('util')

const logLevels = { 
  fatal: 0, 
  error: 1, 
  warn: 2, 
  info: 3, 
  http: 4,
  verbose: 5, 
  debug: 6, 
  trace: 7 
}

const addedColors = {
  fatal: 'red'
}


module.exports = function (config) {
  const hostname = (config.hostInfo && config.hostInfo.hostname) || os.hostname()
  const pid = (config.hostInfo && config.hostInfo.pid) || (cluster.worker && cluster.worker.process.pid ? cluster.worker.process.pid : process.pid)
  const formatter = winston.format.printf(info => {
    const prefix = `${info.timestamp} - ${info.level}: (${hostname}) (${pid})`

    info.meta = info[Symbol.for('splat')]

    if (info.meta && info.meta.length) {
      info.meta = info.meta.map(item => {
        return typeof item === 'object' ? util.format(item) : item
      })
      
      return `${prefix} ********* - ${info.message} ***** ${info.meta}`
    }
    return `${prefix} ********* - ${info.message}`
  })

  const env = config.env && config.env.toLowerCase()
  let logger

  switch (env) {
    case 'local':
    case 'dev':
    case 'development':
      logger = winston.createLogger({
        level: 'silly',
        levels: logLevels,
        format: winston.format.combine(
          winston.format.timestamp(),
          winston.format.colorize(),
          winston.format.splat(),
          formatter
        ),
        transports: [new winston.transports.Console()],
        exitOnError: true
      })
      winston.addColors(addedColors)
      break
    case 'qa':
      logger = winston.createLogger({
        level: 'debug',
        levels: logLevels,
        format: winston.format.combine(
          winston.format.timestamp(),
          winston.format.splat(),
          formatter
        ),
        transports: [new winston.transports.Console()],
        exitOnError: false
      })
      winston.addColors(addedColors)
      break
    case 'prod':
    case 'production':
      logger = winston.createLogger({
        level: 'info',
        levels: logLevels,
        format: winston.format.combine(
          winston.format.timestamp(),
          winston.format.splat(),
          formatter
        ),
        transports: [new winston.transports.Console()],
        exitOnError: false
      })
      winston.addColors(addedColors)
      break
    default:
      logger = winston.createLogger({
        level: 'debug',
        levels: logLevels,
        format: winston.format.combine(
          winston.format.timestamp(),
          winston.format.splat(),
          formatter
        ),
        transports: [new winston.transports.Console()],
        exitOnError: false
      })
      winston.addColors(addedColors)
  }

  logger.level = (config.osseus_logger && config.osseus_logger.log_level) || logger.level

  logger.trace = logger.silly

  if (config.osseus_logger.no_console_override) {
    return logger
  }

  console.debug = logger.debug
  console.log = logger.debug
  // console.info = logger.info // this is on purpose - so we can have a bypass using console.info
  console.warn = logger.warn
  console.error = logger.error

  return logger
}
