const {
  addReview,
  getReviewByProductId,
  getReviewById,
} = require("../controller/reviewController");
const { verifyAll, verifyAdmin } = require("../middleware/authMiddleware");

const reviewRouter = require("express").Router();

reviewRouter.post("/add", verifyAll, addReview);
reviewRouter.get("/getproduct", getReviewByProductId);
reviewRouter.get("/getuser", verifyAll, getReviewById);
// reviewRouter.delete()

module.exports = reviewRouter;
