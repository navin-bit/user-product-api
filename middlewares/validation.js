const Joi = require("joi");
const { logger } = require("./logger");

// User schema
const userSchema = Joi.object({
  username: Joi.string().min(4).max(8).required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(4).max(8).required(),
  phone: Joi.number().integer().min(1000000000).max(9999999999).required(),
  address: Joi.string().required(),
  createdBy: Joi.string().optional(),
  updatedBy: Joi.string().optional(),
});

// login schema
const loginSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().min(4).max(8).required(),
});

// Product schema
const productSchema = Joi.object({
  name: Joi.string().required(),
  description: Joi.string().required(),
  userId: Joi.string().optional(),
  published: Joi.boolean().required(),
  price: Joi.number().required(),
  rating: Joi.number().required(),
  createdBy: Joi.string().optional(),
  updatedBy: Joi.string().optional(),
});

// Login validation middleware
const loginValidation = async (req, res, next) => {
  const { error, value } = await loginSchema.validate(req.body, {
    abortEarly: false,
  });
  if (error) {
    logger.error("Login validation error");
    return res.status(400).send({ message: error.details });
  }
  req.body = value;
  next();
};

// User validation middleware
const userValidation = async (req, res, next) => {
  const { error, value } = await userSchema.validate(req.body, {
    abortEarly: false,
  });
  if (error) {
    logger.error("user validation error");
    return res.status(400).send({ message: error.details });
  }
  req.body = value;
  next();
};

// Product validation middleware
const productValidation = async (req, res, next) => {
  const { error, value } = await productSchema.validate(req.body, {
    abortEarly: false,
  });
  if (error) {
    logger.error("product validation error");
    return res.status(400).send({ message: error.details });
  }
  req.body = value;
  next();
};

module.exports = {
  userValidation,
  productValidation,
  loginValidation,
};
