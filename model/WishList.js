const mongoose = require("mongoose");

const {Schema} = mongoose

const wishListSchema = new Schema({
  userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
  productIds: { type: [Schema.Types.ObjectId], ref: "Product" },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("WishList", wishListSchema);
