import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
  {
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    adminId: { type: mongoose.Schema.ObjectId, ref: "admin" },
    dbStatus: { type: Boolean },
    img: { type: String },
  },
  { timestamps: { type: Date, default: Date.now } }
);

const User = mongoose.model("user", UserSchema);
export default User;
