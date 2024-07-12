const Product = require("../model/Product");
const Review = require("../model/Review");
const decryptToken = require("../helper/helper");
const mongoose = require("mongoose");

const add = async (req, res) => {
  try {
    const decryptedToken = decryptToken(req.token);
    const userId = decryptedToken.user._id;
    const { productId } = req.params;
    console.log(productId);
    const { rating, comment } = req.body;
    const product = await Product.findById(productId);

    if (!product) {
      res.status(404).json({ message: "No such product found" });
    } else {

      const review = await Review.findOne({ product: productId, user: userId });
      if(review){
        return res.status(409).json({status: false, message: "Already gave a review" });
      }
      const newReview = new Review({
        user: userId,
        product: productId,
        rating,
        comment,
      });
      await newReview.save();

      res.status(201).json({
        status: true,
        message: "Review added successfully",
      });
    }
  } catch (error) {
    res.status(500).json({
      status: false,
      message: error.message,
    });
  }
};

const getByProduct = async (req, res) => {
  try {
    const { productId } = req.params;
    console.log(productId);
    const review = await Review.find({ product: productId })
      .populate("product", "name images")
      .populate("user", "firstName");
    if (!review) {
      res.status(404).json({
        status: false,
        message: "No review exists",
      });
    }
    res.status(200).json({
      review: review,
    });
  } catch (error) {
    res.status(500).json({ status: false, message: error.message });
  }
};

const getByUser = async (req, res) => {
  try {
    const decryptedToken = decryptToken(req.token);
    const userId = decryptedToken.user._id;
    const review = await Review.findOne({ user: userId })
      .populate("product", "name images")
      .populate("user", "firstName");
    if (!review) {
      res.status(404).json({
        status: false,
        message: "No review exists",
      });
    }
    res.status(200).json({
      review: review,
    });
  } catch (error) {
    res.status(500).json({ status: false, message: error.message });
  }
};

const remove = async (req, res) => {
  try {
    const decryptedToken = decryptToken(req.token);
    const userId = decryptedToken.user._id;
    const { productId } = req.params;

    const review = await Review.findOne({ product: productId, user: userId });

    if (!review) {
      return res.status(404).json({
        status: false,
        message: "No review found to delete",
      });
    }

    await review.remove();

    res.status(200).json({
      status: true,
      message: "Review deleted successfully",
    });
  } catch (error) {
    res.status(500).json({ status: false, message: error.message });
  }
};

// const updateReview = async(req,res){

// }

module.exports = {
  add,
  getByProduct,
  getByUser,
  remove
};
