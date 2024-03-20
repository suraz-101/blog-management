const mongoose = require("mongoose");

const categorySchema = new mongoose.Schema({
  categoryName: {
    type: String,
    required: [true, "Name is mandatory"],
    unique: true,
  },
  categoryDescription: {
    type: String,
    required: [
      true,
      "Please give the description of the category. it is mandatory",
    ],
  },
});

const CategoryModel = new mongoose.model("category", categorySchema);

module.exports = CategoryModel;
