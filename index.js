const path = require('path')

function getAWSInstanceId () {
  return new Promise(resolve => {
    const metadata = require('node-ec2-metadata')
    const os = require('os')

    metadata.isEC2()
      .then(onEC2 => {
        if (!onEC2) {
          return Promise.resolve(os.hostname())
        }

        return metadata.getMetadataForInstance('instance-id')
      })
      .then(resolve)
      .catch(error => {
        console.error(`ec2 getMetadataForInstance encountered an error: ${error}`)
        resolve(os.hostname())
      })
  })
}

const init = function (osseus) {
  return new Promise(async resolve => {
    const logger = require(path.join(__dirname, '/lib/winston'))(osseus.config)
    logger.awsInstanceId = await getAWSInstanceId()

    Object.assign(this, logger)
    resolve(this)
  })
}

module.exports = {
  init: init
}
