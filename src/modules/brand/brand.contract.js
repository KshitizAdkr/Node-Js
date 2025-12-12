const Joi = require('joi')
const { GlobalStatus } = require('../../config/constants')

const BrandCreateRule = Joi.object({
  name: Joi.string().min(2).max(200).required(),
  status: Joi.string().regex(/^(active|inactive)$/).default(GlobalStatus.INACTIVE),
  logo: Joi.string().optional().allow(null,'').default(null)
})

module.exports = {
  BrandCreateRule
}