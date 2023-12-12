const jwt = require("jsonwebtoken");
const CryptoJS = require("crypto-js");
const User = require("../model/User");

const signupUser = async (req, res) => {
  const {
    email,
    password,
    firstName,
    lastName,
    contactNumber,
  } = req.body;
  try {
    const user = await User.findOne({
      email: email,
    });
    if (!user) {
      const newUser = new User({
        email: email,
        password: CryptoJS.AES.encrypt(
          password,
          process.env.CRYPTO_SECRET
        ).toString(),
        firstName: firstName,
        lastName: lastName,
        contactNumber: contactNumber,
      });
      await newUser.save();
      res.status(201).json({
        status: true,
        message: "User created successfully",
      });
    } else {
      res.status(409).json({
        status: false,
        message: "User already exist",
      });
    }
  } catch (error) {
    res.status(500).json({
      status: false,
      message: error.message,
    });
  }
};

const signinUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({
      email: email,
    });
    if (user) {
      const decryptedPass = CryptoJS.AES.decrypt(
        user.password,
        process.env.CRYPTO_SECRET
      ).toString(CryptoJS.enc.Utf8);
      if (password === decryptedPass) {
        const token = jwt.sign({ user }, process.env.JWT_SECRET, {
          expiresIn: "2h",
        });
        res.status(200).json({
          status: true,
          message: "User signed in",
          token: token,
        });
      } else {
        res.status(401).json({
          status: false,
          message: "Wrong password",
        });
      }
    } else {
      res.status(401).json({
        status: false,
        message: "Wrong credential",
      });
    }
  } catch (error) {
    res.status(500).json({
      status: false,
      message: error.message,
    });
  }
};

module.exports = { signupUser, signinUser };
