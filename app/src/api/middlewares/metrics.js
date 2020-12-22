const promBundle = require("express-prom-bundle")
const observability = require('../../observability')

module.exports = promBundle({
  promRegistry: observability.metrics.register
})
