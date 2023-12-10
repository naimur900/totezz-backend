const WishList = require("../model/WishList");
const decryptToken = require("../helper/helper");
const Product = require("../model/Product");

const addToWishList = async (req, res) => {
  try {
    const decryptedToken = decryptToken(req.token);
    const userId = decryptedToken._id;
    const { productId } = req.body;
    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ message: "No such product is found" });
    }
    const wishList = await WishList.findOne({ userId: userId });
    if (!wishList) {
      const newWishList = new WishList({
        userId: userId,
        productIds: [productId],
      });
      await newWishList.save();
      res.status(201).json({ message: "Product added to wishlist" });
    }

    if (wishList.productIds.includes(productId)) {
      res.status(400).json({ message: "Product already exists in wishlist" });
    }

    wishList.productIds.push(productId);
    await wishList.save();
    res
      .status(200)
      .json({ message: "Product added to the wishlist successfully" });
  } catch (error) {
    res.status(300).json({
      status: false,
      message: error.message,
    });
  }
};

const getWishListById = async (req, res) => {
  try {
    const decryptedToken = decryptToken(req.token);
    const userId = decryptedToken._id;
    const wishList = await WishList.findOne({ userId: userId }).populate(
      "productIds"
    );
    // .exec();
    if (!wishList) {
      res.status(404).json({
        message: "No such wishlist exists",
      });
    } else {
      res.status(200).json({
        wishList: wishList,
      });
    }
  } catch (error) {
    res.status(500).json({
      status: false,
      message: error.message,
    });
  }
};

const removeFromWishList = async (req, res) => {
  try {
    const { productId } = req.body;
    const decryptedToken = decryptToken(req.token);
    const userId = decryptedToken._id;
    const wishList = await WishList.findOne({ userId: userId });
    if (!wishList) {
      res.status(404).json({ message: "No such wishlist is found" });
    }
    if (wishList.productIds.includes(productId)) {
      res.status(200).json({
        message: "Product removed from wishlist",
        removedProduct: productId.populate(),
      });
    }
    res.status(500).json({
      message: "No such product exist in the wishlist",
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

module.exports = { addToWishList, getWishListById, removeFromWishList };
