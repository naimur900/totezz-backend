const mongoose = require("mongoose");


const wishListSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  product: [{ type: mongoose.Schema.Types.ObjectId, ref: "Product" }],
},{timestamps:true});

module.exports = mongoose.model("WishList", wishListSchema);
