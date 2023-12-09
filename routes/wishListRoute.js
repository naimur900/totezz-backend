const { addToWishList, getWishListById } = require("../controller/wishListController")

const wishListRouter = require("express").Router()

wishListRouter.post("/:userId",addToWishList)
wishListRouter.get("/:userId",getWishListById)

module.exports = wishListRouter