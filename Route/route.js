const router = require("express").Router();
const blogRouter = require("../modules/blog/blog.route");
const categoryRoute = require("../modules/category /category.route");
const userRouter = require("../modules/user/user.route");
router.use("/blogs", blogRouter);
router.use("/users", userRouter);
router.use("/category", categoryRoute);

module.exports = router;
