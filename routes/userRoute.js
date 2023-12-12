const userRouter = require("express").Router();
const {
  getUser,
  getUserById,
  updateUserById,
  deleteUserById,
} = require("../controller/userController");
const { verifyAll, verifyAdmin } = require("../middleware/authMiddleware");

userRouter.get("/getall", verifyAll, getUser);
userRouter.get("/getone", verifyAll, getUserById);
userRouter.put("/update", verifyAll, updateUserById);
userRouter.delete("/delete", verifyAll, deleteUserById);

module.exports = userRouter;
