const mongoose = require("mongoose");


const userSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  contactNumber: { type: Number, required: true },
  isAdmin: { type: Boolean, default: false },
  reviews: [{ type: mongoose.Schema.Types.ObjectId, ref: "Review" }],
  wishlist: [{ type: mongoose.Schema.Types.ObjectId, ref: "WishList" }]
},{timestamps:true});

module.exports = mongoose.model("User", userSchema);