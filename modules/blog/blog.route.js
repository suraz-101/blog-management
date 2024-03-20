const blogRouter = require("express").Router();
const blogController = require("./blog.controller");
const { validation } = require("./blog.validate");
const { generateSlug } = require("../../utils/slugify");
const { checkRole } = require("../../utils/sessionManager");
const multer = require("multer");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./public/blogs");
  },
  filename: function (req, file, cb) {
    // const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const upload = multer({ storage: storage });

blogRouter.get("/", async (req, res, next) => {
  try {
    const { title, page, limit } = req.query;
    const search = { title };
    const result = await blogController.getBlogs(search, page, limit);
    res.status(200).json({ message: result });
  } catch (error) {
    next(error);
  }
});

blogRouter.post(
  "/",
  upload.single("blogImage"),
  validation,
  async (req, res, next) => {
    try {
      const { title } = req.body;
      const slug = await generateSlug(title);
      if (req.file) {
        const path = req.file.path.replace("public", "");
        req.body.blogImage = path;
      }
      req.body.slug = slug;
      const result = await blogController.createBlog(req.body);
      res.status(200).json({ message: result });
    } catch (error) {
      next(error);
    }
  }
);

blogRouter.get("/publishedBlogs", async (req, res, next) => {
  try {
    const { title, page, limit } = req.query;
    const search = { title };
    const result = await blogController.getPublishedBlog(search, page, limit);
    res.status(200).json({ message: result });
  } catch (error) {
    next(error);
  }
});

blogRouter.delete("/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    const result = await blogController.deleteBlog(id);
    res.status(200).json({ message: result });
  } catch (error) {
    next(error);
  }
});

blogRouter.put(
  "/updateBlog",
  upload.single("blogImage"),
  async (req, res, next) => {
    try {
      const { id, ...rest } = req.body;
      const result = await blogController.updateBlogDetails(id, rest);
      res.status(200).json({ message: result });
    } catch (error) {
      next(error);
    }
  }
);
module.exports = blogRouter;
