import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: String,
  email: { type: String, unique: true },
  password: String,
  role: { type: String, enum: ["Admin","Teacher","Student","Child","Guest"], default: "Guest" },
  emailVerified: { type: Boolean, default: false }
});

export default mongoose.model("User", userSchema);
