function validateRequest (schema) {
  return (req, _, next) => {
    const { error } = schema.validate(req.body)

    next(error)
  }
}

module.exports = validateRequest
