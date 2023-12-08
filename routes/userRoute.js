const userRouter = require("express").Router();
const {
  getUser,
  getUserById,
  updateUserById,
  deleteUserById,
} = require("../controller/userController");
const { verifyAll, verifyAdmin } = require("../middleware/authMiddleware");

userRouter.get("/all", verifyAll, getUser);
userRouter.get("/:userId", verifyAll, getUserById);
userRouter.put("/:userId", verifyAll, updateUserById);
userRouter.delete("/:userId", verifyAll, deleteUserById);

module.exports = userRouter;
