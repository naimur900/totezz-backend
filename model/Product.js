const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, default: "" },
  price: { type: Number, required: true },
  images: {
    type: [String],
    default: [
      "https://static-01.daraz.com.bd/p/694f2a323cb546ba47ff42aa998646a0.jpg",
    ],
  },
  stock: { type: Number, required: true },
  reviews: [{ type: mongoose.Schema.Types.ObjectId, ref: "Review" }],
  wishlist: [{ type: mongoose.Schema.Types.ObjectId, ref: "WishList" }]

}, { timestamps: true });

module.exports = mongoose.model("Product", productSchema);
