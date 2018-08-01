const path = require('path')

const init = function (osseus) {
  return new Promise((resolve, reject) => {
    const logger = require(path.join(__dirname, '/lib/cll'))(osseus.config)
    Object.assign(this, logger)
    resolve(this)
  })
}

module.exports = {
  init: init
}
