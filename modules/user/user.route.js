const userRouter = require("express").Router();
const userController = require("./user.controler");
const { userValidate, loginValidation } = require("./user.validate");
const { checkRole } = require("../../utils/sessionManager");
const multer = require("multer");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./public/images");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  },
});
const uploadImage = multer({ storage: storage });

userRouter.post(
  "/registerUser",
  uploadImage.single("profilePic"),
  userValidate,
  async (req, res, next) => {
    try {
      req.body.profilePic = req.file.path.replace("public", "");
      const result = await userController.registerUser(req.body);
      res.status(200).json({ message: result });
    } catch (error) {
      next(error);
    }
  }
);

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

userRouter.post("/generateOtp", async (req, res, next) => {
  try {
    const result = await userController.sendOtp(req.body);
    res.status(200).json({ message: result });
  } catch (error) {
    next(error);
  }
});

userRouter.post("/verifyOtp", async (req, res, next) => {
  try {
    const result = await userController.verifyOtpCode(req.body);
    res.status(200).json({ message: result });
  } catch (error) {
    next(error);
  }
});

userRouter.get("/getUserDetail", async (req, res, next) => {
  try {
    const { email } = req.query;
    const result = await userController.getUserDetails(email);
    res.status(200).json({ message: result });
  } catch (error) {
    next(error);
  }
});

userRouter.put("/updateUser", async (req, res, next) => {
  try {
    const { id, ...rest } = req.body;
    const result = await userController.updateUserDetails(id, rest);
    res.status(200).json({ message: result });
  } catch (error) {
    next(error);
  }
});

userRouter.delete("/deleteUser", async (req, res, next) => {
  try {
    const { id } = req.query;

    const result = await userController.DeleteUser(id);
    res.status(200).json({ message: result });
  } catch (error) {
    next(error);
  }
});

userRouter.patch("/:id", (req, res, next) => {});

module.exports = userRouter;
