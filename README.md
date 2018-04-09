# Osseus Logger

Osseus [winston](https://github.com/winstonjs/winston) based logger

### Install
```bash
$ npm install osseus-logger
```

### Usage
```bash
const OsseusLogger = require('osseus-logger')

const logger = await OsseusLogger.init(config)
// option #1"
logger.log('info', "127.0.0.1 - there's no place like home")
// option #2
logger.info("127.0.0.1 - there's no place like home")
// option #3
console.info("127.0.0.1 - there's no place like home")
```

#### Config
config should have a "get" function which receives the key name and returns the value

* `OSSEUS_LOGGER_LOG_LEVEL` - optional, see [Winston Logging Levels](https://github.com/winstonjs/winston#logging-levels)
* `ENV` - optional

#### Note
console.log is equivalent to logger.debug
