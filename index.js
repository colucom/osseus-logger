const path = require('path')
const aws = require('./lib/aws')()

const init = function (osseus) {
  return new Promise(async resolve => {
    const logger = require(path.join(__dirname, '/lib/winston'))(osseus.config)
    const {name, pid} = await aws.getInstanceId()

    logger.instanceId = name
    logger.pid = pid

    Object.assign(this, logger)
    resolve(this)
  })
}

module.exports = {
  init: init
}
