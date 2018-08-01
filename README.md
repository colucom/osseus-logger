[![JavaScript Style Guide](https://cdn.rawgit.com/standard/standard/master/badge.svg)](https://github.com/standard/standard)

# Osseus Logger

<!--[winston](https://github.com/winstonjs/winston) based osseus logger module-->

[console-log-level](https://github.com/watson/console-log-level) based osseus logger module

## Install
```bash
$ npm install osseus-logger
```

## Usage

#### Configuration
<!--* `OSSEUS_LOGGER_LOG_LEVEL`
	* Mandatory. See [Winston Logging Levels](https://github.com/winstonjs/winston#logging-levels)
	* Default log levels:
		* DEV environment - `silly`
		* QA environment - `debug`
		* PROD envrionment - `info`-->

* `OSSEUS_LOGGER_LOG_LEVEL`
	* Mandatory. Options are: `['trace', 'debug', 'info', 'warn', 'error', 'fatal']`
	* Default log levels:
		* DEV environment - `trace`
		* QA environment - `debug`
		* PROD envrionment - `info`

***Note: `console` is not being overriden, so any use of it is not recommended except when developing***

#### Example
First, create `index.js`:

```javascript
const Osseus = require('osseus')

const main = async () => {
	try {
		// init osseus
		const osseus = await Osseus.init()
		// option #1
		osseus.logger.info(`hello logger`)
		// option #2
		osseus.logger.info(`hello`, `logger`)
  	} catch (err) {
		console.error(err)
  	}
}

main()

```

Running:

```bash
$ node index.js --OSSEUS_LOGGER_LOG_LEVEL 'debug'
```

Will result in:

```sh
2018-06-21T12:38:15.650Z - info: (Liors-MacBook-Pro.local) (63287) - hello logger
2018-06-21T12:38:15.650Z - info: (Liors-MacBook-Pro.local) (63287) - hello logger
```

## License
Code released under the [MIT License](https://github.com/colucom/osseus-logger/blob/master/LICENSE).
