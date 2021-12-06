import { TodoTask } from '../models/TodoTask.js';

function success(res, payload) {
    return res.status(200).json(payload)
}

export const createTodo = async (req,res, next) => {
    try {
        const todo = await TodoTask.create(req.body)
        return success(res, todo)
    } catch (err) {
        next({ status: 400, message: "failed to create todos" })
    }
}

export const getTodos = async (req,res, next) => {
    try {
        const todos = await TodoTask.find({})
        return success(res, todos)
      } catch (err) {
        next({ status: 400, message: "failed to get todos" })
      }
}

export const updateTodo = async (req, res, next) => {
    try {
      const todo = await TodoTask.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
    })
      return success(res, todo)
    } catch (err) {
      next({ status: 400, message: "failed to update todo" })
    }
}

export const deleteTodo = async (req, res, next) => {
    try {
      await TodoTask.findByIdAndRemove(req.params.id)
      return success(res, "todo deleted!")
    } catch (err) {
      next({ status: 400, message: "failed to delete todo" })
    }
}