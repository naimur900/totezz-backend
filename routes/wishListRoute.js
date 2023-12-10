const { addToWishList, getWishListById, removeFromWishList } = require("../controller/wishListController")
const {verifyAll, verifyAdmin} = require("../middleware/authMiddleware")

const wishListRouter = require("express").Router()

wishListRouter.post("/add",verifyAll, addToWishList)
wishListRouter.get("/get",verifyAll,getWishListById)
wishListRouter.delete("/remove", verifyAll, removeFromWishList)

module.exports = wishListRouter