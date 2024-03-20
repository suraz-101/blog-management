const categoryRoute = require("express").Router();
const categoryController = require("./category.controller");
const { categoryValidation } = require("./category.validate");

categoryRoute.post("/", categoryValidation, async (req, res, next) => {
  try {
    const result = await categoryController.createCategory(req.body);
    res.status(200).json({ message: result });
  } catch (error) {
    next(error);
  }
});

categoryRoute.get("/", async (req, res, next) => {
  try {
    const result = await categoryController.getAllCategory();
    res.status(200).json({ message: result });
  } catch (error) {
    next(error);
  }
});

module.exports = categoryRoute;
