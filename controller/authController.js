const jwt = require("jsonwebtoken");
const CryptoJS = require("crypto-js");
const User = require("../model/User");

const signupUser = async (req, res) => {
  const {
    username,
    email,
    password,
    firstName,
    lastName,
    address: { street, city, postalCode },
  } = req.body;
  try {
    const user = await User.findOne({
      email: email,
    });
    if (!user) {
      const newUser = new User({
        username: username,
        email: email,
        password: CryptoJS.AES.encrypt(
          password,
          process.env.CRYPTO_SECRET
        ).toString(),
        firstName: firstName,
        lastName: lastName,
        address: { street, city, postalCode },
      });
      await newUser.save();
      res.status(404).json({
        status: true,
        message: "User created successfully",
      });
    } else {
      res.status(404).json({
        status: false,
        message: "User already exist",
      });
    }
  } catch (error) {
    console.log("ekhanei mair khaise");

    res.status(404).json({
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
        const token = jwt.sign(
          {
            user,
          },
          process.env.JWT_SECRET,
          { expiresIn: "2h" }
        );
        res.status(200).json({
          status: true,
          message: "User signed in",
          token: token,
        });
      } else {
        res.status(400).json({
          status: false,
          message: "Wrong password",
        });
      }
    } else {
      res.status(404).json({
        status: false,
        message: "Wrong credential",
      });
    }
  } catch (error) {
    res.status(404).json({
      status: false,
      message: error.message,
    });
  }
};

module.exports = { signupUser, signinUser };
