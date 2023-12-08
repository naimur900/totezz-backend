const jwt = require("jsonwebtoken");

const verifyToken = (req, res, next) => {
  const authHeader = req.header.authorization;
  if (authHeader) {
    const token = authHeader.split(" ")[1];
    // const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
    // console.log(decodedToken);
    jwt.verify(token, process.env.JWT_SECRET, function (error, user) {
      if (error) {
        res.status(403).json({
          status: false,
          message: error.message,
        });
      } else {
        // res.status(200).json({
        //   status: true,
        //   user: user,
        // });
        req.user = user;
        next();
      }
    });
  } else {
    res.status(403).send();
  }
};

const verifyAll = (req, res, next) => {
  verifyToken(req, res, () => {
    next();
  });
};

const verifyAdmin = (req, res, next) => {
  verifyToken(req, res, () => {
    const isAdmin = req.user.isAdmin;
    if (isAdmin) {
      next();
    } else {
      res.status(404).json({
        status: false,
        message: "You are not authorized",
      });
    }
  });
};

module.exports = { verifyAll, verifyAdmin, verifyToken };
