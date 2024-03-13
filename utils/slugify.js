const slugify = require("slugify");

const generateSlug = (title) => {
  return slugify(title, {
    replacement: "-",
    lower: true,
  });
};

module.exports = { generateSlug };
