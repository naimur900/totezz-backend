const { add, get, remove } = require("../controller/wishListController")
const {verifyAll, verifyAdmin} = require("../middleware/authMiddleware")

const wishListRouter = require("express").Router()

wishListRouter.post("/add",verifyAll, add)
wishListRouter.get("/get",verifyAll,get)
wishListRouter.delete("/remove", verifyAll, remove)

module.exports = wishListRouter