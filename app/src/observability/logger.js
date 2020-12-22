const winston = require('winston')
const LokiTransport = require("winston-loki")
const package = require('../../package.json')

const logger = winston.createLogger({
  level: 'debug',
  format: winston.format.json(),
  defaultMeta: {
    labels: {
      service: package.name, 
      version: package.version
    }
  },
  transports: [
    new winston.transports.Console({
      format: winston.format.simple(),
      handleExceptions: true,
      handleRejections: true
    })
  ]
})

if (process.env.NODE_ENV === 'production') {
  logger.add(new LokiTransport({
    host: 'http://loki:3100',
    json: true
  }))
}

module.exports = logger
