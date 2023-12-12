const mongoose = require("mongoose");

const { Schema } = mongoose;

const reviewSchema = new Schema({
  userId: { type: [Schema.Types.ObjectId], ref: "User", required: true },
  productId: { type: Schema.Types.ObjectId, ref: "Product", required: true },
  rating: { type: [Number], required: true, min: 1, max: 5 },
  content: { type: [String], required: true },
  // createdAt: { type: [Date], default: [Date.now] },
});

module.exports = mongoose.model("Review", reviewSchema);
