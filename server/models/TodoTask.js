import mongoose from 'mongoose';

const todoTaskSchema = new mongoose.Schema({
    task: {
        type: String,
        required: true
    }
})

export const TodoTask = mongoose.model("TodoTask", todoTaskSchema);