const User = require("../model/User");

const getUser = async (req, res) => {
  try {
    const users = await User.find();
    if (!users) {
      res.status(404).json({ status: false, message: "There is no User" });
    } else {
      res.status(200).json(Users);
    }
  } catch (error) {
    res.status(500).json({ status: false, error: error.message });
  }
};

const getUserById = async (req, res) => {
  const userId = req.params.userId;
  try {
    const user = await User.findById(userId);
    // Need to fix error showcasing
    if (!user) {
      res.status(404).json({ status: false, message: "User is not found" });
    } else {
      res.status(200).json(user);
    }
  } catch (error) {
    res.status(500).json({ status: false, error: error.message });
  }
};

const updateUserById = async (req, res) => {
  const userId = req.params.userId;
  // console.log(UserId);
  const updatedProperties = req.body;
  // console.log(updatedProperties);
  try {
    const user = await user.findById(userId);
    // console.log(User);
    if (!user) {
      res.status(404).json({
        status: flase,
        message: "No such User is found",
      });
    } else {
      // Password hash kora lagbe change korte hoile
      const updatedUser = await User.findByIdAndUpdate(
        userId,
        { $set: updatedProperties },
        {
          new: true,
          runValidators: true,
        }
      );

      res.status(200).json({
        status: true,
        message: "User updated successfully",
        updatedUser: updatedUser,
      });
    }
  } catch (error) {
    res.status(500).json({
      status: false,
      message: error.message,
    });
  }
};

const deleteUserById = async (req, res) => {
  const userId = req.params.userId;
  //   console.log(userId);
  try {
    const user = await User.findById(userId);
    if (!user) {
      res.status(404).json({
        status: flase,
        message: "User not found",
      });
    } else {
      await User.findByIdAndDelete(userId);
      res.status(200).json({
        status: true,
        message: "User deleted successfully",
      });
    }
  } catch (error) {
    res.status(300).json({
      status: false,
      message: error.message,
    });
  }
};

module.exports = { getUser, getUserById, updateUserById, deleteUserById };
