const {
  add,
  getByProduct,
  getByUser,
  remove,
} = require("../controller/reviewController");
const { verifyAll, verifyAdmin } = require("../middleware/authMiddleware");

const reviewRouter = require("express").Router();

reviewRouter.post("/add/:productId", verifyAll, add);
reviewRouter.get("/get/:productId", getByProduct);
reviewRouter.get("/getbyuser", verifyAll, getByUser);
reviewRouter.delete("/delete/:productId", verifyAll, remove)

module.exports = reviewRouter;
