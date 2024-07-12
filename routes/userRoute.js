const userRouter = require("express").Router();
const {
  getOne,
  getAll,
  update,
  remove,
} = require("../controller/userController");
const { verifyAll, verifyAdmin } = require("../middleware/authMiddleware");

userRouter.get("/getall", verifyAll, getAll);
userRouter.get("/getone", verifyAll, getOne);
userRouter.put("/update", verifyAll, update);
userRouter.delete("/delete", verifyAll, remove);

module.exports = userRouter;
