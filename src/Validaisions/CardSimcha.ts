import Joi from "joi";

export const registerSchema = Joi.object({
    title: Joi.string().min(2).max(256).required(),
    subtitle: Joi.string().min(2).max(256).required(),
    description: Joi.string().min(2).max(1024).required(),
    phone: Joi.string().min(9).max(11).required(),
    email: Joi.string().min(5).required(),
    web: Joi.string().min(14).required(),
    image: Joi.object({
      url: Joi.string().min(14).required(),
      alt: Joi.string().min(2).max(256).required(),
    }).required(),
    address: Joi.object({
      state: Joi.string().required(),
      country: Joi.string().required(),
      city: Joi.string().required(),
      street: Joi.string().required(),
      houseNumber: Joi.number().min(1).required(),
      zip: Joi.number().required(),
    }).required(),
  });


export default registerSchema;
