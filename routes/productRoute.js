const productRouter = require("express").Router();
const {
  getProduct,
  getProductById,
  addProduct,
  deleteProductById,
  updateProductById,
} = require("../controller/productController");
const { verifyAll, verifyAdmin } = require("../middleware/authMiddleware");

productRouter.get("/getall", getProduct);
productRouter.post("/getone", getProductById);
productRouter.post("/add", verifyAll, addProduct);
productRouter.put("/update", verifyAll, updateProductById);
productRouter.delete("/delete", verifyAll, deleteProductById);

module.exports = productRouter;
