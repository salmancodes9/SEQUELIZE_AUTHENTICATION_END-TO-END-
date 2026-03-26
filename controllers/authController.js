const user = require("../models/user");
const BlackListedToken = require("../models/BlackListedToken");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
// const { authPlugins } = require("mysql2");
// const authenticate = require("../middleware/authMiddleware");

const register = async (req, res) => {
  console.log("here im printing")
  try {
    const { name, email, password } = req.body;
    const existingUser = await user.findOne({ where: { email } });
    if (existingUser)
      return res.status(400).json({ message: "Email already exists" });

    const hashedPassword = await bcrypt.hash(password, 10);

    await user.create({
      name: name,
      email: email,
      password: hashedPassword,
    });
    res.status(201).json({ message: "user created successfully" });
  } catch (err) {
    return res.status(500).json({ message: "server deesnt respond" });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const existingUser = await user.findOne({ where: { email } });

    if (!existingUser)
      return res.status(400).json({ message: "Email dosent exist" });

    const hashedpassword = await bcrypt.compare(
      password,
      existingUser.password,
    );

    if (hashedpassword === true) {
      const token = jwt.sign(
        {
          id: existingUser.id,
          email: existingUser.email,
        },
        "learning_secret_key",
        { expiresIn: "1h" }, // timing change fro exisitng and after change token
      );
      return res
        .status(200)
        .json({ message: "Login successfully", token: token });
    } else {
      return res.status(400).json({ message: "Password Incorrect" });
    }
  } catch (err) {
    return res.status(500).json({ message: " Server doesnt respond" });
  }
};
const getMe = async (req, res) => {
  res.status(200).json({ user: req.user });
};
const logout = async (req, res) => {

  const token = req.headers['authorization'].split(' ')[1]

  await BlackListedToken.create({token: token})
  return res.status(200).json({ message: "logged out sucessfully" });
};

module.exports = { register, login, getMe, logout };
