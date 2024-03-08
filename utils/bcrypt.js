const bcrypt = require("bcryptjs");

const hashPassword = (password) => {
  return bcrypt.hashSync(password, Number(process.env.SALT));
};

const comparePass = (password, hashed) => {
  return bcrypt.compareSync(password, hashed);
};

module.exports = { hashPassword, comparePass };
