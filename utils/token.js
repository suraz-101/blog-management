const jwt = require("jsonwebtoken");
const crypto = require("crypto");

const generateToken = (payload) => {
  return jwt.sign(payload, process.env.SECRETE, {
    expiresIn: process.env.DURATION,
  });
};

const verifyToken = async (token) => {
  return await jwt.verify(token, process.env.SECRETE);
};

const generateOtp = () => {
  return crypto.randomInt(100000, 999999);
};

module.exports = { generateToken, verifyToken, generateOtp };
