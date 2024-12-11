const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const saltRounds = 10;
const User = require("../model/User");

const signupUser = async (req, res) => {
  const { email, password, firstName, lastName, contactNumber } = req.body;

  try {
    const existingUser = await User.findOne({
      email: email,
    });

    if (existingUser) {
      return res.status(409).json({
        status: false,
        message: "User already exists",
      });
    }

    bcrypt.hash(password, saltRounds).then(async (hash) => {
      const newUser = new User({
        email,
        password: hash,
        firstName,
        lastName,
        contactNumber,
      });

      await newUser.save();
      return res.status(201).json({
        status: true,
        message: "User created successfully",
      });
    });
  } catch (error) {
    res.status(500).json({
      status: false,
      message: error.message,
    });
  }
};

const signinUser = async (req, res) => {
  const { email, password } = req.body;
  // console.log(email,password);
  
  try {
    const user = await User.findOne({
      email: email,
    });

    if (!user) {
      return res.status(404).json({
        status: false,
        message: "No such user found. Please sign up.",
      });
    }

    bcrypt.compare(password, user.password).then((result) => {
      if (result) {
        // console.log(user);
        
        const token = jwt.sign({ user }, process.env.JWT_SECRET, {
          expiresIn: "2h",
        });
        return res.status(200).json({
          status: true,
          message: "User signed in",
          firstName: user.firstName,
          lastName: user.lastName,
          token: token,
          isAdmin: user.isAdmin
        });
      } else {
        return res.status(401).json({
          status: false,
          message: "Wrong password",
        });
      }
    });
  } catch (error) {
    return res.status(500).json({
      status: false,
      message: error.message,
    });
  }
};

module.exports = { signupUser, signinUser };
