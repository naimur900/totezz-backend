const Product = require("../model/Product");
const Review = require("../model/Review");
const decryptToken = require("../helper/helper");
const mongoose = require("mongoose");

const addReview = async (req, res) => {
  try {
    const decryptedToken = decryptToken(req.token);
    const userId = decryptedToken.user._id;
    const { productId, rating, content } = req.body;
    const product = await Product.findById(productId);
    if (!product) {
      res.status(404).json({ message: "No such product is found" });
    } else {
      const review = await Review.findOne({ productId: productId });
      if (!review) {
        const newReview = new Review({
          userId: userId,
          productId: productId,
          rating: rating,
          content: content,
        });
        await newReview.save();
        res.status(201).json({
          status: true,
          message: "Review added successfully",
        });
      } else {
        if (review.userId.includes(userId)) {
          res.json({
            message: "You have already provided a review on this product",
          });
        } else {
          review.userId.push(userId);
          review.content.push(content);
          review.rating.push(rating);
          await review.save();
          res.status(201).json({
            status: true,
            message: "Review added successfully",
          });
        }
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
    const review = await Review.findOne(productId);
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

const getReviewById = async (req, res) => {
  try {
    const decryptedToken = decryptToken(req.token);
    // const userId = decryptedToken.user._id;
    const userId = new mongoose.Types.ObjectId(decryptedToken.user._id);
    const review = await Review.aggregate([
      {
        $match: { userId: userId },
      },
      {$group:{userId: $rating}}
    ]);
    res.json({ message: "Hoilo na", review });

    // const decryptedToken = decryptToken(req.token);
    // const userId = decryptedToken.user._id;
    // const review = await Review.find({ userId: userId });
    // const tempReview = [];
    // if (review) {
    //   for (let i = 0; i < review.length; i++) {
    //     const index = review[i].userId.indexOf(userId);
    //     let content = review[i].content[index];
    //     let rating = review[i].rating[index];
    //     let tempObj = { Content: content, Rating: rating };
    //     tempReview.push(tempObj);
    //   }
    //   res.status(200).json({
    //     status: true,
    //     review: tempReview,
    //   });
    // } else {
    //   res.status(500).json({ status: false, message: "No review found" });
    // }
  } catch (error) {
    res.status(500).json({ status: false, message: error.message });
  }
};

const deleteReviewById = async (req, res) => {
  try {
    const decryptedToken = decryptToken(req.token);
    const userId = decryptedToken.user._id;
    const productId = req.body;
    const review = await Review.findOne(productId);
    if (!review) {
      res.status(404).json({
        status: false,
        message: "No review exists",
      });
    } else {
      if (review.userId.includes(userId)) {
        const index = review.userId.indexOf(userId);
        // res.json(index);
        await Review.findByIdAndUpdate("657842c3dd48767c95d59d5b", {
          $pull: {
            userId: { $postion: index },
            content: { $postion: index },
            rating: { $postion: index },
          },
        });
        res.json({ message: "deleted" });
      } else {
        res.status(404).json({
          message: "No review found",
        });
      }
    }
  } catch (error) {
    res.status(500).json({ status: false, message: error.message });
  }
};

// const updateReview = async(req,res){

// }

module.exports = {
  addReview,
  getReviewByProductId,
  getReviewById,
  deleteReviewById,
};
