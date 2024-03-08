const userRouter = require("express").Router();
const userController = require("./user.controler");
const { userValidate, loginValidation } = require("./user.validate");
const { checkRole } = require("../../utils/sessionManager");

userRouter.post("/registerUser", userValidate, async (req, res, next) => {
  try {
    const result = await userController.registerUser(req.body);
    res.status(200).json({ message: result });
  } catch (error) {
    next(error);
  }
});

userRouter.get("/", checkRole(["user"]), async (req, res, next) => {
  try {
    const { limit, page, name, email } = req.query;
    const search = { email, name };
    const result = await userController.getUsers(search, limit, page);
    res.status(200).json({ message: result });
  } catch (error) {
    next(error);
  }
});

userRouter.post("/login", loginValidation, async (req, res, next) => {
  try {
    const result = await userController.login(req.body);
    res.status(200).json({ message: result });
  } catch (error) {
    next(error);
  }
});

module.exports = userRouter;
