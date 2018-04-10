const path = require('path')

const init = function (osseus) {
  this.osseus = osseus
  const config = osseus.config
  return new Promise((resolve, reject) => {
    config.get = function (key) {
      return config.osseus_logger[key.toLowerCase()] || config[key.toLowerCase()]
    }
    const logger = require(path.join(__dirname, '/lib/winston'))(config)
    Object.assign(this, logger)
    resolve(this)
  })
}

module.exports = {
  init: init
}
