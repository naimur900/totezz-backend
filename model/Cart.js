const mongoose = require("mongoose");

const cartSchema = new mongoose.Schema({
  user: { type: Schema.Types.ObjectId, ref: "User", required: true },
  items: [
    {
      product: { type: Schema.Types.ObjectId, ref: "Product", required: true },
      quantity: { type: Number, required: true, min: 1 },
    },
  ],
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

// cartSchema.pre('save', async function (next) {
//     const cart = this;
//     const promises = cart.items.map(async (item) => {
//       const product = await Product.findById(item.product);
//       if (!product) {
//         throw new Error('Invalid bag in cart');
//       }
//     });
//     await Promise.all(promises);
//     next();
//   });

module.exports = mongoose.model("Cart", cartSchema);
