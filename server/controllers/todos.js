import { TodoTask } from '../models/TodoTask.js';

function success(res, payload) {
    return res.status(200).json(payload)
}

export const createTodo = async (req,res) => {
  try {
    const todo = await TodoTask.create(req.body)
    return success(res, todo)
  } catch (err) {
    console.log(err)
  }
}

export const getTodos = async (req,res) => {
  try {
    const todos = await TodoTask.find({})
    return success(res, todos)
  } catch (err) {
    console.log(err)
  }
}

export const updateTodo = async (req, res) => {
  try {
    const todo = await TodoTask.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  })
    return success(res, todo)
  } catch (err) {
    console.log(err)
  }
}

export const deleteTodo = async (req, res) => {
  try {
    await TodoTask.findByIdAndRemove(req.params.id)
    return success(res, "todo deleted!")
  } catch (err) {
    console.log(err)
  }
}