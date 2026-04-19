const user = require("../../models/user");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

module.exports = async ({ name, email, password }) => {
  if (!name) throw new Error("empty field");
  if (!email) throw new Error("email cannot be empty");
  if (!password || password.length < 8) throw new Error("weak password");

  const existingUser = await user.findOne({ where: { email } });
  if (existingUser) throw new Error("email already exists");
  const hashedPassword = await bcrypt.hash(password, 10);

  const createdUser = await user.create({
    name,
    email,
    password: hashedPassword,
  });

  const token = jwt.sign(
    {
      id: createdUser.id,
      email: createdUser.email,
    },
    "learning_secret_key",
    { expiresIn: "4h" },
  );

  return {
    message: "registered and logged in successfully",
    token,
    user: {
      id: createdUser.id,
      name: createdUser.name,
      email: createdUser.email,
    },
  };
};
