const Joi = require("joi");

const passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[\d])(?=.*[\w_]).{8,25}$/;

const registerDTO = Joi.object({
  name: Joi.string().max(50).min(2).required().messages({
    "string.min": "Name must have atleast 2 characters",
  }),
  email: Joi.string().email().required().messages({
    "string.email": "email must be of a valid email format"
  }),
  password: Joi.string().regex(passwordPattern).required().messages({
    "string.pattern.base": "Password must comply with strong password. \n(*Must include a samll letter \n* Must include a capital letter \n* Must include a number \n* Must include a special charater \n* Must be of 8-25 character long. \n"
  }),
  confirmPassword: Joi.string().equal(Joi.ref("password")).required().messages({
    "any.only": "Confirm password must be same as password"
  }),
  role : Joi.string().regex(/^(customer|seller)$/).optional().default("customer").messages({
    "string.pattern.base": "Role should be any of 'customer' or 'seller' only."
  }),
  phone: Joi.string()
    // .regex(/(\+977)?[9][6-9]\d{8}/)
    .optional().default(null).messages({
      "string.pattern.base": "Phone number must be of 10 digit long or should start with +977"
    }),
  address: Joi.string().allow(null, "").optional().default(null),
});

const loginDTO = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().min(8).max(25).required(),
});

module.exports = {
    registerDTO, loginDTO
}