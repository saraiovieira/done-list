import mongoose from 'mongoose';

const todoTaskSchema = new mongoose.Schema({
    user_id: {
      type: String,
      required: false,
    },
    task: {
        type: String,
        unique: false,
        required: true,
    },
    completed: {
        type: Boolean,
        default: true,
        required: false,
    },
})
  
export const TodoTask = mongoose.model("TodoTask", todoTaskSchema);