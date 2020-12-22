const cuid = require('cuid')

function requestId (req, res, next) {
  req.id = cuid()
  res.set('x-request-id', req.id)

  next()
}

module.exports = requestId
