import mongoose from 'mongoose';

const todoTaskSchema = new mongoose.Schema({
    task: {
        type: String,
        unique: true,
        required: true,
    },
    completed: {
        type: Boolean,
        default: false,
        required: false,
    },
})

export const TodoTask = mongoose.model("TodoTask", todoTaskSchema);