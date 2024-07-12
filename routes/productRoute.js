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
productRouter.post("/getone", getOne);
productRouter.post("/add", verifyAll, add);
productRouter.put("/update", verifyAll, update);
productRouter.delete("/delete", verifyAll, remove);

module.exports = productRouter;
