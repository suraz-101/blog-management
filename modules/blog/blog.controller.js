const BlogModel = require("./blog.model");

const getBlogs = async () => {
  return await BlogModel.find();
};

const createBlog = async (payload) => {
  const result = await BlogModel.create(payload);
  if (!result) throw new Error("cannot create blog");
  return "Blog added successfully";
};

module.exports = { getBlogs, createBlog };
