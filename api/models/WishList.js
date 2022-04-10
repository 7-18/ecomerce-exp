import mongoose from "mongoose";

const WishListSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.ObjectId, ref: "user", required: true },
    products: [
      {
        productId: {
          type: mongoose.Schema.ObjectId,
          ref: "product",
          required: true,
        },
        quantity: {
          type: Number,
          default: 1,
        },
      },
    ],
  },
  { timestamps: { type: Date, default: Date.now } }
);

const WishList = mongoose.model("wishlist", WishListSchema);
export default WishList;
