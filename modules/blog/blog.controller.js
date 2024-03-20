const BlogModel = require("./blog.model");

const getBlogs = async (search, page = 1, limit = 2) => {
  const query = [];
  if (search?.title) {
    query.push({
      $match: {
        title: new RegExp(search.title, "gi"),
      },
    });
  }

  query.push(
    {
      $project: {
        _id: 0,
        title: 1,
        content: 1,
        slug: 1,
        status: 1,
        blogImage: 1,
      },
    },
    {
      $facet: {
        metadata: [
          {
            $count: "total",
          },
        ],
        data: [
          {
            $skip: (+page - 1) * +limit,
          },
          {
            $limit: +limit,
          },
        ],
      },
    }
  );
  const result = await BlogModel.aggregate(query);
  return {
    data: result[0].data,
    total: result[0].metadata[0].total,
    page: +page,
    limit: +limit,
  };
};

const createBlog = async (payload) => {
  const result = await BlogModel.create(payload);
  if (!result) throw new Error("cannot create blog");
  return "Blog added successfully";
};

const getPublishedBlog = async (search, page = 1, limit = 2) => {
  const query = [];

  query.push({
    $match: {
      status: "published",
    },
  });
  if (search?.title) {
    query.push({
      $match: {
        title: new RegExp(search.title, "gi"),
      },
    });
  }

  query.push(
    {
      $project: {
        _id: 0,
        title: 1,
        content: 1,
        slug: 1,
        status: 1,
        blogImage: 1,
      },
    },
    {
      $facet: {
        metadata: [
          {
            $count: "total",
          },
        ],
        data: [
          {
            $skip: (+page - 1) * +limit,
          },
          {
            $limit: +limit,
          },
        ],
      },
    }
  );
  const result = await BlogModel.aggregate(query);
  return {
    data: result[0].data,
    total: result[0].metadata[0].total,
    page: +page,
    limit: +limit,
  };
};

const deleteBlog = async (_id) => {
  return await BlogModel.deleteOne({ _id });
};

const updateBlogDetails = async (_id, payload) => {
  if (!_id) throw new Error("id is mandatory. Please enter the Id");
  const blog = await BlogModel.findOne({ _id });
  if (!blog) throw new Error("Blog not found");
  const isUpdate = await BlogModel.updateOne({ _id }, payload);
  if (!isUpdate) throw new Error("failed to update blog details ");
  return "Blog Updated Successfully";
};

module.exports = {
  getBlogs,
  createBlog,
  getPublishedBlog,
  deleteBlog,
  updateBlogDetails,
};
