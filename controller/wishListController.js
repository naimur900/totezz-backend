const WishList = require("../model/WishList");
const User = require("../model/User");
const Product = require("../model/Product");

const addToWishList = async (req, res) => {
  const { productId } = req.body;
  const userId = req.params.userId;
  try {
    if (!productId) {
      return res
        .status(404)
        .json({ message: "ProductId not provided in the body" });
    }
    const wishList = await WishList.findOne({userId:userId});

    if (!wishList) {
      const newWishList = new WishList({
        userId: userId,
        productIds: [productId],
      });
      await newWishList.save();
      return res.status(201).json({ message: "Product added to wishlist" });
    }

    if (wishList.productIds.includes(productId)) {
      return res
        .status(400)
        .json({ message: "Product already exists in wishlist" });
    }

    wishList.productIds.push(productId);
    await wishList.save();
  } catch (error) {
    res.status(300).json({
      status: false,
      message: error.message,
    });
  }
};

const getWishListById = async (req, res) => {
  const userId = req.params.userId;
  //   const { productId } = req.body;
  const wishList = await WishList.findOne({userId:userId})
    .populate("productIds")
    // .exec();
  try {
    if (!wishList) {
      return res.status(404).json({
        message: "No wishlist exists",
      });
    }
    return res.status(200).json({
      wishList: wishList,
    });
  } catch (error) {
    return res.status(500).json({ message: "Error fetching wishlists" });
  }
};

module.exports = { addToWishList, getWishListById };
