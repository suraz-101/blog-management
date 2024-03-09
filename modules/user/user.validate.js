const Joi = require("joi");

const schema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string()
    .required()
    .email({ tlds: { allow: ["com"] } }),
  password: Joi.string().required(),
  roles: Joi.array().items(Joi.string().valid("user", "admin")),
  profilePic: Joi.string(),
});

const loginSchema = Joi.object({
  email: Joi.string().required(),
  password: Joi.string().required(),
});

const loginValidation = async (req, res, next) => {
  const { error } = await loginSchema.validate(req.body);
  error ? res.status(500).json({ message: error.details[0].message }) : next();
};

const userValidate = async (req, res, next) => {
  try {
    const { error } = await schema.validate(req.body);
    error
      ? res.status(500).json({ message: error.details[0].message })
      : next();
  } catch (error) {
    next(error);
  }
};

module.exports = { userValidate, loginValidation };
