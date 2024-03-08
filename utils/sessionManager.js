const { verifyToken } = require("./token");

const checkRole = (sysRole) => {
  return async (req, res, next) => {
    try {
      const { accesstoken } = req.headers;
      const { roles } = await verifyToken(accesstoken);
      const isValid = sysRole.some((role) => role.includes(roles));
      if (!isValid) throw new Error("permission Deniened");
      next();
    } catch (error) {
      next(error);
    }
  };
};

module.exports = { checkRole };
