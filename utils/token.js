const jwt = require("jsonwebtoken");

const generateToken = (payload) => {
  return jwt.sign(payload, process.env.SECRETE, {
    expiresIn: process.env.DURATION,
  });
};

const verifyToken = async (token) => {
  return await jwt.verify(token, process.env.SECRETE);
};

module.exports = { generateToken, verifyToken };
