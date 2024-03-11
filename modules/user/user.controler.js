const UserModel = require("./user.model");
const { hashPassword, comparePass } = require("../../utils/bcrypt");
const { mail } = require("../../services/mail");
const { generateToken, generateOtp } = require("../../utils/token");

const registerUser = async (payload) => {
  const { password, email } = payload;
  if (!password) throw new Error("password is mandaroty");
  const hashedPass = await hashPassword(password);
  payload.password = hashedPass;
  const user = await UserModel.create(payload);
  if (!user) throw new Error("registration failed");
  const mailer = await mail(
    email,
    "Registration status",
    "Registration Successed"
  );
  if (!mailer) throw new Error("failed to send mail");
  return "Registration successfull";
};

const getUsers = async (search, limit = 2, page = 1) => {
  const query = [];

  if (search?.name) {
    query.push({
      $match: {
        name: new RegExp(`${search.name}`, "gi"),
      },
    });
  }

  if (search?.email) {
    query.push({
      $match: {
        name: new RegExp(`${search.email}`, "gi"),
      },
    });
  }

  query.push(
    {
      $project: {
        _id: 0,
        name: 1,
        email: 1,
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
  const data = await UserModel.aggregate(query);

  if (data[0].data.length === 0) throw new Error("users not found");
  return {
    data: data[0].data,
    page: +page,
    total: data[0].metadata[0].total,
    limit: +limit,
  };
};

const login = async (payload) => {
  const { email, password } = payload;
  if (!email & !password) throw new Error("something is missing");
  const user = await UserModel.findOne({ email }).select("+password");
  if (!user) throw new Error("user not found");
  const { password: hashedPassword } = user;
  const isValid = await comparePass(password, hashedPassword);
  if (!isValid) throw new Error("password does not matched");
  const tokenPayload = {
    name: user.name,
    email: user.email,
    roles: user.roles,
  };
  const token = await generateToken(tokenPayload);
  return token;
};

const sendOtp = async (payload) => {
  const { email } = payload;
  if (!email) throw new Error("please enter email");
  const user = await UserModel.findOne({ email });

  console.log(user);
  if (!user) throw new Error("user not found");
  const otp = await generateOtp();
  const mailer = await mail(email, "Otp Code", `Your otp code is : ${otp}`);
  if (!mailer) throw new Error("failed to send mail");
  await UserModel.updateOne({ email }, { otp: otp });
  return "mail sent";
};

const verifyOtpCode = async (payload) => {
  const { email, otp, newPassword } = payload;
  if (!email && !otp && !newPassword) throw new Error("something is missing");
  const user = await UserModel.findOne({ email });
  if (!user) throw new Error("user Not found");
  const { otp: userOtp } = user;
  if (userOtp !== otp) throw new Error("invalid otp code");
  const hashPass = await hashPassword(newPassword);
  const updateUser = await UserModel.updateOne(
    { email },
    { password: hashPass, otp: "" }
  );
  return "password changed successfully";
};

const getUserDetails = async (email) => {
  console.log(email);
  const user = await UserModel.aggregate([
    {
      $match: {
        email: "surazpandey12@gmail.com",
      },
    },
    {
      $project: {
        _id: 0,
        name: 1,
        email: 1,
      },
    },
  ]);

  if (!user) throw new Error("User not found");

  return user;
};

const updateUserDetails = () => {};

module.exports = {
  registerUser,
  getUsers,
  login,
  sendOtp,
  verifyOtpCode,
  getUserDetails,
};
