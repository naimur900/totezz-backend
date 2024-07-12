const WishList = require("../model/WishList");
const decryptToken = require("../helper/helper");
const Product = require("../model/Product");

const add = async (req, res) => {
  try {
    const decryptedToken = decryptToken(req.token);
    const userId = decryptedToken.user._id;
    const { productId } = req.body;
    const product = await WishList.findById(productId);
    if (!product) {
      return res.status(404).json({ message: "No such product found" });
    }
    const wish = await WishList.findOne({ product: productId, user: userId });
    if (wish) {
      return res
        .status(400)
        .json({ message: "Product already exists in wishlist" });
    }
    const newWishList = new WishList({
      user: userId,
      product: productId,
    });
    await newWishList.save();
    res
      .status(201)
      .json({ status: true, message: "Successfully added to wishlist" });
  } catch (error) {
    res.status(300).json({
      status: false,
      message: error.message,
    });
  }
};

const get = async (req, res) => {
  try {
    const decryptedToken = decryptToken(req.token);
    const userId = decryptedToken.user._id;
    const wish = await WishList.find({ user: userId }).populate(
      "product",
      "name images"
    );
    if (!wish) {
      return res.status(404).json({
        status: false,
        message: "No such wishlist exists",
      });
    }
    return res.status(200).json({
      wishList: wish,
    });
  } catch (error) {
    res.status(500).json({
      status: false,
      message: error.message,
    });
  }
};

const remove = async (req, res) => {
  try {
    const { productId } = req.body;
    const decryptedToken = decryptToken(req.token);
    const userId = decryptedToken.user._id;
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

module.exports = { add, get, remove };
