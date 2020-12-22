function errorHandler (err, req, res, next) { 
  const status = err.status || (err.isJoi ? 400 : 500)
  const message = err.message
  const details = err.details

  if (status >= 500) {
    req.ctx.logger.error(err)
  }
  else {
    req.ctx.logger.debug(err)
  }

  res.status(status).send({ error: { message, details } })
}

module.exports = errorHandler
