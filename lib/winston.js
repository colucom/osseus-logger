const winston = require('winston')
const cluster = require('cluster')
const os = require('os')
const moment = require('moment')

const timestamp = function () {
  return moment().format(moment.HTML5_FMT.DATETIME_LOCAL_MS) + 'Z'
}

const formatter = function (options) {
  const hostname = os.hostname()
  const pid = cluster.worker && cluster.worker.process.pid ? cluster.worker.process.pid : process.pid

  const level = options.level
  const msg = options.message || ''
  const meta = options.meta && Object.keys(options.meta).length ? '\n\t' + JSON.stringify(options.meta) : ''

  return options.timestamp() + ' - ' + level + ': ' + '(' + hostname + ')' + ' ' + '(' + pid + ')' + ' - ' + msg + ' ' + meta
}

const transports = {
  dev: [
    new (winston.transports.Console)({
      level: 'silly',
      timestamp: timestamp,
      formatter: formatter,
      colorize: true,
      json: false,
      exitOnError: false
    })
  ],
  qa: [
    new (winston.transports.Console)({
      level: 'debug',
      timestamp: timestamp,
      formatter: formatter,
      colorize: false,
      json: false,
      exitOnError: false
    })
  ],
  production: [
    new (winston.transports.Console)({
      level: 'info',
      timestamp: timestamp,
      formatter: formatter,
      colorize: false,
      json: false,
      exitOnError: false
    })
  ],
  default: [
    new (winston.transports.Console)({
      level: 'info',
      timestamp: timestamp,
      formatter: formatter,
      colorize: false,
      json: false,
      exitOnError: false
    })
  ]
}

module.exports = function (config) {
  let logger
  const env = config.env
  const logLevel = config.osseus_logger.log_level

  switch (env) {
    case 'local':
    case 'dev':
    case 'development':
      logger = new (winston.Logger)({transports: transports.dev})
      break
    case 'qa':
      logger = new (winston.Logger)({transports: transports.qa})
      break
    case 'prod':
    case 'production':
      logger = new (winston.Logger)({transports: transports.prod})
      break
    default:
      logger = new (winston.Logger)({transports: transports.default})
  }

  if (logLevel) {
    logger.transports.console.level = logLevel
  }

  console.log = logger.debug
  console.info = logger.info
  console.warn = logger.warn
  console.error = logger.error

  return logger
}
