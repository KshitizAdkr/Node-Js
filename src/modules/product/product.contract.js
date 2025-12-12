const Joi = require("joi");
const { GlobalStatus } = require("../../config/constants");

const ProductCreateRule = Joi.object({
    name: Joi.string().min(3).max(200).required(),
    price: Joi.string().min(1).required(),   //in rupee
    discount: Joi.string().min(0).max(95).default(0),
    description: Joi.string().min(10).default(null),
    brand: Joi.string().optional().allow(null, '').default(null),
    category: Joi.array().items(Joi.string()).required(),
    stock: Joi.number().min(0).optional().allow(null, "").default(0),
    sku: Joi.string().optional().allow(null, "").default(0), 
    attributes: Joi.array().items(Joi.object({
        key: Joi.string().optional().allow(null,'').default(0),
        value: Joi.array().items(Joi.string())
    })).optional().allow(null, '').default(null),
    seller: Joi.string().optional().allow(null, "").default(null),
    status: Joi.string().regex(/^(active|inactive)$/).default(GlobalStatus.INACTIVE),
    images: Joi.string().optional().allow(null, "").default(null),
});

module.exports = {
    ProductCreateRule
}