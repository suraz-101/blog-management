const mongoose = require("mongoose");

const blogSchema = new mongoose.Schema({
  title: { type: String, required: [true, "Title is mandatory"] },
  content: {
    type: String,
    required: [true, "Content of the title is requred"],
  },
  slug: { type: String, required: [true, "Slug is required"], unique: true },
  blogImage: { type: String },
  status: { type: String, default: "draft" },
});

const BlogModel = new mongoose.model("blog", blogSchema);

module.exports = BlogModel;
