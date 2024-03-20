const Joi = require("joi");

const schema = Joi.object({
  categoryName: Joi.string().required(),
  categoryDescription: Joi.string(),
});

const categoryValidation = (req, res, next) => {
  try {
    const { error } = schema.validate(req.body);
    error ? res.status(500).json({ error: error.details[0].message }) : next();
  } catch (error) {
    next(error);
  }
};

module.exports = { categoryValidation };
