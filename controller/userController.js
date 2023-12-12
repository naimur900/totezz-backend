const User = require("../model/User");
const decryptToken = require("../helper/helper");

const getUser = async (req, res) => {
  try {
    const users = await User.find();
    if (!users) {
      res.status(404).json({ status: false, message: "User is not found" });
    } else {
      res.status(200).json(Users);
    }
  } catch (error) {
    res.status(500).json({ status: false, error: error.message });
  }
};

const getUserById = async (req, res) => {
  try {
    const decryptedToken = decryptToken(req.token);
    const userId = decryptedToken.user._id;
    const user = await User.findById(userId);
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
  try {
    const decryptedToken = decryptToken(req.token);
    const userId = decryptedToken.user._id;
    const updatedProperties = { ...req.body, password: undefined };
    const user = await User.findById(userId);
    if (!user) {
      res.status(404).json({
        status: flase,
        message: "User is not found",
      });
    } else {
      const updatedUser = await User.findByIdAndUpdate(
        userId,
        { $set: updatedProperties },
        {
          new: true,
          runValidators: true,
        }
      );
      res.status(201).json({
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
  try {
    // const decryptedToken = decryptToken(req.token);
    // const userId = decryptedToken.user._id;
    const {userId} = req.body;
    const user = await User.findById(userId);
    if (!user) {
      res.status(404).json({
        status: false,
        message: "User is not found",
      });
    } else {
      await User.findByIdAndDelete(userId);
      res.status(200).json({
        status: true,
        message: "User is deleted successfully",
      });
    }
  } catch (error) {
    res.status(500).json({
      status: false,
      message: error.message,
    });
  }
};

module.exports = { getUser, getUserById, updateUserById, deleteUserById };
