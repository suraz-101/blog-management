const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema.Types;

const blogSchema = new mongoose.Schema({
  title: { type: String, required: [true, "Title is mandatory"] },
  content: {
    type: String,
    required: [true, "Content of the title is requred"],
  },
  author: {
    type: ObjectId,
    ref: "Users",
    required: [true, "Author is missing"],
  },
  slug: { type: String, required: [true, "Slug is required"], unique: true },
  blogImage: { type: String },
  status: { type: String, default: "draft" },
  category: { type: ObjectId, required: true, ref: "categories" },
});

const BlogModel = new mongoose.model("blog", blogSchema);

module.exports = BlogModel;
