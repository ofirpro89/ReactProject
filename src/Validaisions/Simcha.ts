import Joi from "joi";

export const registerSchema = Joi.object({
  name: Joi.object()
  .keys({
    first: Joi.string().min(2).max(256).required(),
    middle: Joi.string().min(2).max(256).allow(""),
    last: Joi.string().min(2).max(256).required(),
  }),


  address: Joi.object({
  state: Joi.string().required(),
  country: Joi.string().required(),
  city: Joi.string().required(),
  street: Joi.string().required(),
  houseNumber: Joi.number().required(),
  zip: Joi.number().required(),
}).required(),
  phone: Joi.string().required(),

  email: Joi.string()
    .email({ tlds: { allow: false } })
    .required(),

  image: Joi.object({
    url: Joi.string().uri().required(),
    alt: Joi.string().required(),
  }).required(),

  password: Joi.string()
  .pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*\-])[A-Za-z\d!@#$%^&*\-]{9,}$/)
  .message(
    'Password must be at least nine characters long and contain an uppercase letter, a lowercase letter, a number and one of the following characters !@#$%^&*-'
  )
  .required(),

  isBusiness: Joi.boolean().required(),


});

export default registerSchema;
