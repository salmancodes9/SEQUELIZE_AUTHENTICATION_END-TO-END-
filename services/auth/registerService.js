const user = require("../../models/user");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

module.exports = async ({ name, email, password }) => {
    if (!name) throw new Error("empty field");
    if (!email) throw new Error("email cannot be empty");
    if (!password || password.length < 8) throw new Error("weak password");

    const existingUser = await user.findOne({ where: { email } });
    if (existingUser) throw new Error("email already exists");
    const hashedpasswrod = await bcrypt.hash(password, 10);
    return await user.create({
        name,
        email,
        password: hashedpasswrod,
    });
};
