const path = require('path')

const make = function (dependenciesGraph, folderStruct) {
  // nothing to do here
}

const init = function (config) {
  const logger = require(path.join(__dirname, '/lib/winston'))(config)
  return logger
}

module.exports = {
  make: make,
  init: init
}
