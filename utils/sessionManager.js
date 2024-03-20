const UserModel = require("../modules/user/user.model");
const { verifyToken } = require("./token");

const checkRole = (sysRole) => {
  return async (req, res, next) => {
    try {
      const { accesstoken } = req.headers;
      const { roles, email } = await verifyToken(accesstoken);
      const isValid = sysRole.some((role) => role.includes(roles));
      if (!isValid) throw new Error("permission Deniened");
      const user = await UserModel.findOne({ email });
      req.body.author = user._id.toString();
      next();
    } catch (error) {
      next(error);
    }
  };
};

module.exports = { checkRole };
