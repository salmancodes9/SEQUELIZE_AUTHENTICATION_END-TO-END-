const jwt = require("jsonwebtoken");
const { URL } = require("url");
const JWT_SECRET = process.env.JWT_SECRET;

function verifySocketToken(req) {
  //I refuse to parse a URL unless it looks complete (has a protocol + domain)." all the data comes from req.url and the string just completes it
  const parsedUrl = new URL(req.url, "http://localhost");//new url a keyword without it we will pass only a string
  const token = parsedUrl.searchParams.get("token");
  if (!token) {
    return null;
  }
  try {
    
    const decoded = jwt.verify(token, JWT_SECRET);
    return decoded;
  } catch (err) {
    return null;
  }
}
module.exports = verifySocketToken;