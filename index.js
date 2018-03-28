const path = require('path')

const init = function (config) {
  return new Promise((resolve, reject) => {
    const logger = require(path.join(__dirname, '/lib/winston'))(config)
    resolve(logger)
  })
}

module.exports = {
  init: init
}
