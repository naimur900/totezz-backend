const mongoose = require("mongoose");

const Schema = mongoose

const userSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  contactNumber: { type: Number, required: true },
  isAdmin: { type: Boolean, default: false },
  productCart: [{product: { type: Schema.Types.ObjectId, ref: "Product"}, quantity: { type: Number, default: 0 }}]
},{timestamps:true});

module.exports = mongoose.model("User", userSchema);