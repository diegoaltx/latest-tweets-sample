const onFinished = require('on-finished')

function accessLog (req, res, next) {
  const startedAt = new Date()
  req.ctx.logger.debug('Request received.')
  

  onFinished(res, (_, res) => {
    req.ctx.logger.debug(`Response sent.`, {
      responseStatus: res.statusCode,
      responseTime: (new Date()) - startedAt
    })
  })

  next()
}

module.exports = accessLog
