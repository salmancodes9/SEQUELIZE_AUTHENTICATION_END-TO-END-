const user = require("../../models/user");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const JWT_SECRET = process.env.JWT_SECRET;

// if (!JWT_SECRET) {
//   throw new Error("JWT_SECRET is not configured");
// }

module.exports = async ({ email, password }) => {
  if (!email || !password) throw new Error("empty field");
  if (password.length < 8) throw new Error("password must be strong");
  const existingUser = await user.findOne({ where: { email } });
  if (!existingUser) throw new Error("user does not exist");
  const hashedpassword = await bcrypt.compare(password, existingUser.password);
  if (hashedpassword === true) {
    const token = jwt.sign(
      {
        id: existingUser.id,

        email: existingUser.email,
      },
      JWT_SECRET,
      { expiresIn: "4h" },
    );
    return { message: "logged in sucessfully", token };
  }

  throw new Error("password incorrect");
};
