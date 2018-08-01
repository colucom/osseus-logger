const cll = require('console-log-level')
const cluster = require('cluster')
const os = require('os')

const timestamp = () => {
  return new Date().toISOString()
}

const formatter = (level) => {
  const hostname = os.hostname()
  const pid = cluster.worker && cluster.worker.process.pid ? cluster.worker.process.pid : process.pid
  return `${timestamp()} - ${level}: (${hostname}) (${pid})`
}

module.exports = (config) => {
  const env = config.env && config.env.toLowerCase()
  const loglevel = config.osseus_logger && config.osseus_logger.log_level
  let logger

  switch (env) {
    case 'local':
    case 'dev':
    case 'development':
      logger = cll({
        level: loglevel || 'trace',
        prefix: formatter
      })
      break
    case 'qa':
      logger = cll({
        level: loglevel || 'debug',
        prefix: formatter
      })
      break
    case 'prod':
    case 'production':
      logger = cll({
        level: loglevel || 'info',
        prefix: formatter
      })
      break
    default:
      logger = cll({
        level: loglevel || 'debug',
        prefix: formatter
      })
  }

  return logger
}
