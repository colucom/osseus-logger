# Colu Logger

Colu's [winston](https://github.com/winstonjs/winston) based logger

### Install
```bash
$ npm install colu-logger
```

### Usage
```bash
const ColuLogger = require('colu-logger')

const logger = ColuLogger.init(config)
// option #1"
logger.log('info', "127.0.0.1 - there's no place like home")
// option #2
logger.info("127.0.0.1 - there's no place like home")
// option #3
console.info("127.0.0.1 - there's no place like home")
```

#### Config
config should have a "get" function which receives the key name and returns the value

* `LOG_LEVEL` - optional, see [Winston Logging Levels](https://github.com/winstonjs/winston#logging-levels)
* `ENV` - optional

#### Note
console.log is equivalent to logger.debug
