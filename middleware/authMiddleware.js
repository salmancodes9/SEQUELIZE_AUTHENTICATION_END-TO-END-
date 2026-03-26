const jwt = require("jsonwebtoken");
const BlackListedToken = require("../models/BlackListedToken")

const authenticate = async (req, res, next) => {
      console.log("hit")

  try {
    const authHeader = req.headers["authorization"];

    

    if (!authHeader) {
      return res.status(401).json({ message: "No token provided" });
    }

    const token = authHeader.startsWith("Bearer ") //if my auth header here strarts with bearer then split and use the part 1 
      ? authHeader.split(" ")[1]
      : authHeader
      console.log("tokenrecived",token)


       if (!token) {
      return res.status(401).json({ message: "No token provided" });
    }

    const isBlackListedToken = await BlackListedToken.findOne ({where: {token}})
    if (isBlackListedToken) {
      return res.status(401).json ({message:"Token has been logged out "})
    }


   

    const decoded = jwt.verify(token,"learning_secret_key");

    req.user = decoded;
    next();
  } catch (err) {
    console.error("Authentication error:", err.message);
    return res.status(401).json({ message: "Invalid or expired token" });
  }
};

module.exports = authenticate;
