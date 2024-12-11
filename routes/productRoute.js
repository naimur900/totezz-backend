const productRouter = require("express").Router();
const {
  getOne,
  getAll,
  add,
  remove,
  update,
} = require("../controller/productController");
const { verifyAll, verifyAdmin } = require("../middleware/authMiddleware");

productRouter.get("/getall", getAll);
productRouter.get("/getone/:productId", getOne);
productRouter.post("/add", verifyAdmin, add);
productRouter.put("/update", verifyAdmin, update);
productRouter.post("/delete", verifyAdmin, remove);

module.exports = productRouter;
