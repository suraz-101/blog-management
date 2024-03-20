const CategoryModel = require("./category.model");

const createCategory = async (payload) => {
  const category = await CategoryModel.create(payload);
  if (!category) throw new Error("Failed to create Category");
  return "Category Created Successfully";
};
const getAllCategory = async () => {
  return await CategoryModel.find();
};

module.exports = { createCategory,getAllCategory };
