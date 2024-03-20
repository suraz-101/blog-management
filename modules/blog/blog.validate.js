const Joi = require("joi");

const blogSchema = Joi.object({
  title: Joi.string().required(),
  content: Joi.string().required(),
  blogImage: Joi.string(),
  status: Joi.string(),
  category: Joi.string().required(),
  author: Joi.string().required(),
});

const validation = (req, res, next) => {
  try {
    const { error } = blogSchema.validate(req.body);
    error ? res.status(500).json({ Error: error.details[0].message }) : next();
  } catch (error) {
    next(error);
  }
};

module.exports = { validation };
