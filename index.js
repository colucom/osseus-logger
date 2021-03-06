const path = require('path')

const init = function (osseus) {
  return new Promise(async resolve => {
    const logger = require(path.join(__dirname, '/lib/winston'))(osseus.config)

    Object.assign(this, logger)
    resolve(this)
  })
}

module.exports = {
  init: init
}
