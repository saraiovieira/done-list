import { TodoTask } from '../models/TodoTask.js';

function success(res, payload) {
    return res.status(200).json(payload)
}

export const todoCreate = async (req,res, next) => {
    try {
        const todo = await TodoTask.create(req.body)
        return success(res, todo)
    } catch (err) {
        next({ status: 400, message: "failed to create todos" })
    }
}

export const todos = async (req,res, next) => {
    try {
        const todos = await TodoTask.find({})
        return success(res, todos)
      } catch (err) {
        next({ status: 400, message: "failed to get todos" })
      }
}

export const todoUpdate = async (req, res, next) => {
    try {
      const todo = await TodoTask.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
    })
      return success(res, todo)
    } catch (err) {
      next({ status: 400, message: "failed to update todo" })
    }
}

export const todoDelete = async (req, res, next) => {
    try {
      await TodoTask.findByIdAndRemove(req.params.id)
      return success(res, "todo deleted!")
    } catch (err) {
      next({ status: 400, message: "failed to delete todo" })
    }
}