import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  email: { type: String, unique: true },
  password: { type: String },
  token: { type: String },
});

export const User = mongoose.model("user", userSchema);
