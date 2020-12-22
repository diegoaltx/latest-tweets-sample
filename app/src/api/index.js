const express = require('express')
const bodyParser = require('body-parser')
const routes = require('./routes')
const middlewares = require('./middlewares')

const api = express()
const jsonParser = bodyParser.json()

api.use(middlewares.metrics)
api.use(middlewares.context())
api.use(middlewares.requestId)
api.use(middlewares.logger)
api.use(middlewares.accessLog)
api.use(jsonParser)

api.use('/api/v1', routes)

api.use(middlewares.errorHandler)

module.exports = api
