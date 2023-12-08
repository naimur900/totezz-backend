const authRouter = require("express").Router()
const { signinUser, signupUser } = require("../controller/authController")


authRouter.post("/signin",signinUser)
authRouter.post("/signup",signupUser)


module.exports = authRouter;
