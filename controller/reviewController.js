const Product = require("../model/Product");
const Review = require("../model/Review");
const decryptToken = require("../helper/helper");

const addReview = async (req, res) => {
  try {
    const decryptedToken = decryptToken(req.token);
    const userId = decryptedToken._id;
    const { productId, rating, content } = req.body;
    const product = await Product.findById(productId);
    if (!product) {
      res
        .status(404)
        .json({ message: "No such product found to give a review on" });
    } else {
      const review = await Review.findOne({ productId: productId });
      if (review) {
        review.userId.push(userId);
        review.content.push(content);
        review.rating.push(rating);
        review.createdAt.push(Date.now);
        await review.save();
        res.status(200).json({
          status: true,
          message: "Review added successfully",
        });
      } else {
        const newReview = new Review({
          userId: userId,
          productId: productId,
          rating: rating,
          content: content,
        });
        await newReview.save();
        return res.status(200).json({
          status: true,
          message: "Review added successfully",
        });
      }
    }
  } catch (error) {
    res.status(500).json({
      status: false,
      message: error.message,
    });
  }
};

const getReviewByProductId = async (req, res) => {
  try {
    const productId = req.body;
    const review = await Review.findOne({ productId: productId });
    if (!review) {
      res.status(404).json({
        status: false,
        message: "No review exists",
      });
    }
    res.status(200).json({
      status: true,
      review: review.populate(),
    });
  } catch (error) {
    res.status(500).json({ status: false, message: error.message });
  }
};

const getReviewById = async (req, res) => {
  try {
    const decryptedToken = decryptToken(req.token);
    const userId = decryptedToken._id;
    const review = await Review.findOne({ userId: userId });
    if (!review) {
      res.status(404).json({
        status: false,
        message: "No review exists",
      });
    }
    res.status(200).json({
      wishList: wishList.populate(),
    });
  } catch (error) {
    return res
      .status(500)
      .json({ status: false, message: "Error fetching wishlists" });
  }
};

// const deleteReviewById = async(req,res){

// }

// const updateReview = async(req,res){

// }

module.exports = { addReview, getReviewByProductId, getReviewById };
