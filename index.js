const path = require('path')

const init = function (config) {
  return new Promise((resolve, reject) => {
    config.get = function (key) {
      return config.osseus_logger[key.toLowerCase()] || config[key.toLowerCase()]
    }
    const logger = require(path.join(__dirname, '/lib/winston'))(config)
    resolve(logger)
  })
}

module.exports = {
  init: init
}
