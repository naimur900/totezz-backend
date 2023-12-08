const productRouter = require("express").Router();
const {
  getProduct,
  getProductById,
  addProduct,
  deleteProductById,
  updateProductById,
} = require("../controller/productController");
const { verifyAll, verifyAdmin } = require("../middleware/authMiddleware");

productRouter.get("/all", verifyAll, getProduct);
productRouter.get("/:productId", verifyAll, getProductById);
productRouter.post("/add", verifyAll, addProduct);
productRouter.put("/:productId", verifyAll, updateProductById);
productRouter.delete("/:productId", verifyAll, deleteProductById);

module.exports = productRouter;
