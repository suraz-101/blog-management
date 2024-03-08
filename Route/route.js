const router = require("express").Router();
const blogRouter = require("../modules/blog/blog.route");
const userRouter = require("../modules/user/user.route");
router.use("/blogs", blogRouter);
router.use("/users", userRouter);

module.exports = router;
