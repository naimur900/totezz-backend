const jwt = require("jsonwebtoken");

const verifyToken = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (authHeader) {
    const token = authHeader.split(" ")[1];
    console.log(token);
    jwt.verify(token, process.env.JWT_SECRET, function (error, user) {
      if (error) {
        res.status(403).json({
          status: false,
          message: error.message,
        });
      } else {
        // console.log("Decoded User:", user); 
        req.user = user;
        req.token = token;
        next();
      }
    });
  } else {
    res.status(404).json("No authorization header found");
  }
};

const verifyAll = (req, res, next) => {
  verifyToken(req, res, () => {
    next();
  });
};

const verifyAdmin = (req, res, next) => {
  verifyToken(req, res, () => {
    const isAdmin = req.user?.user?.isAdmin;
    if (isAdmin) {
      next();
    } else {
      res.status(401).json({
        status: false,
        message: "Unauthorized access",
      });
    }
  });
};

module.exports = { verifyAll, verifyAdmin, verifyToken };
