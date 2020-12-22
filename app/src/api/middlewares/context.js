function context (ctx = {}) {
  return (req, _, next) => {
    req.ctx = ctx

    next()
  }
}

module.exports = context
