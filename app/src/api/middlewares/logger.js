const observability = require('../../observability')

function logger (req, _, next) {
  req.ctx.logger = observability.logger.child({ 
    requestId: req.id,
    requestMethod: req.method,
    requestPath: req.path
  })
  next()
}

module.exports = logger
