import mongoose from "mongoose";

const taskSchema = new mongoose.Schema({
  user_id: {
    type: String,
    required: false,
  },
  task: {
    type: String,
    unique: false,
    required: true,
  },
  createdAt: {
    type: String,
    required: true,
  },
});

export const Task = mongoose.model("TaskTask", taskSchema);
