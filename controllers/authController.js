const registerService = require("../services/auth/registerService");
const loginService = require("../services/auth/loginService");
const logoutService = require("../services/auth/logoutService");

const register = async (req, res) => {
  try {
    const user = await registerService(req.body);
    res.status(201).json({ message: "user created successfully", user });
  } catch (err) {
    return res.status(400).json({ message: err.message });
  }
};

const login = async (req, res) => {
  try {
    const result = await loginService(req.body);
    return res.status(200).json(result);
  } catch (err) {
    return res.status(400).json({ message: err.message });
  }
};

const getMe = async (req, res) => {
  res.status(200).json({ user: req.user });
};

const logout = async (req, res) => {
  try {
    const result = await logoutService(req.user.id);
    return res.status(200).json({ message: "loged out", logoutService });
  } catch (err) {
    return res
      .status(500)
      .json({ message: "logout failed", error: err.message });
  }
};

module.exports = { register, login, getMe, logout };
