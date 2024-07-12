const User = require("../model/User");
const decryptToken = require("../helper/helper");

const getAll = async (req, res) => {
  try {
    const users = await User.find();
    if (!users) {
      return res.status(404).json({ status: false, message: "User not found" });
    }
    return res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ status: false, error: error.message });
  }
};

const getOne = async (req, res) => {
  try {
    const decryptedToken = decryptToken(req.token);
    const userId = decryptedToken.user._id;
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ status: false, message: "User not found" });
    }
    return res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ status: false, error: error.message });
  }
};

const update = async (req, res) => {
  try {
    const decryptedToken = decryptToken(req.token);
    const userId = decryptedToken.user._id;
    const updatedProperties = { ...req.body, password: undefined };
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({
        status: flase,
        message: "User is not found",
      });
    }
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { $set: updatedProperties },
      {
        new: true,
        runValidators: true,
      }
    );
    return res.status(201).json({
      status: true,
      message: "User updated successfully",
      updatedUser: updatedUser,
    });
  } catch (error) {
    res.status(500).json({
      status: false,
      message: error.message,
    });
  }
};

const remove = async (req, res) => {
  try {
    const decryptedToken = decryptToken(req.token);
    const userId = decryptedToken.user._id;
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({
        status: false,
        message: "User is not found",
      });
    }
    await User.findByIdAndDelete(userId);
    return res.status(200).json({
      status: true,
      message: "User is deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      status: false,
      message: error.message,
    });
  }
};

module.exports = { getAll, getOne, update, remove };
