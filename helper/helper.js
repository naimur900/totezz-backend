const jwt = require("jsonwebtoken");

const decryptToken = (token) => {
  const decryptedToken = jwt.verify(token, process.env.JWT_SECRET)
  return decryptedToken
};

module.exports = decryptToken