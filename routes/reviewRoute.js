const {
  addReview,
  getReviewByProductId,
  getReviewById,
  deleteReviewById,
} = require("../controller/reviewController");
const { verifyAll, verifyAdmin } = require("../middleware/authMiddleware");

const reviewRouter = require("express").Router();

reviewRouter.post("/add", verifyAll, addReview);
reviewRouter.post("/getproduct", getReviewByProductId);
reviewRouter.get("/getuser", verifyAll, getReviewById);
reviewRouter.delete("/delete", verifyAll, deleteReviewById)

module.exports = reviewRouter;
