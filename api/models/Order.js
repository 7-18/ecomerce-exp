import mongoose from "mongoose";

const OrderSchema = new mongoose.Schema(
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
    amount: { type: Number, required: true },
    address: { type: Object, required: true },
    status: { type: String, default: "pending" },
  },
  { timestamps: { type: Date, default: Date.now } }
);

const Order = mongoose.model("order", OrderSchema);
export default Order;
