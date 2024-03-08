const blogRouter = require("express").Router();

blogRouter.get("/", (req, res, next) => {
  try {
    res.status(200).json({ message: "you are inside get method" });
  } catch (error) {
    next(error);
  }
});

module.exports = blogRouter;
