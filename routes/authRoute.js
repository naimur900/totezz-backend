const express = require("express")
const { signinUser, signupUser } = require("../controller/authController")

const authRouter = express.Router()


authRouter.post("/sigin",signinUser)
authRouter.post("/signup",signupUser)
