import mongoose from "mongoose";

const adminSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, unique: true },
    description: String,
    dbStatus: { type: Boolean, default: true },
  },
  { timestamps: { type: Date, default: Date.now } }
);

const Admin = mongoose.model("admin", adminSchema);
export default Admin;
