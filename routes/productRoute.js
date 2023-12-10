const productRouter = require("express").Router();
const {
  getProduct,
  getProductById,
  addProduct,
  deleteProductById,
  updateProductById,
} = require("../controller/productController");
const { verifyAll, verifyAdmin } = require("../middleware/authMiddleware");

productRouter.get("/getAll", getProduct);
productRouter.get("/getOne", getProductById);
productRouter.post("/add", verifyAll, addProduct);
productRouter.put("/update", verifyAll, updateProductById);
productRouter.delete("/delete", verifyAll, deleteProductById);

module.exports = productRouter;
