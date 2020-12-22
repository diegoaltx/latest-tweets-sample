const Joi = require('joi')

exports.addTagRequest = Joi.object({
  value: Joi.string().min(3).max(20).pattern(/^#[A-Za-z0-9]+$/).required()
})  
