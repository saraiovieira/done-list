import { TodoTask } from "../models/TodoTask.js";

function success(res, payload) {
  return res.status(200).json(payload);
}

function TimestampToDate(timestamp) {
  return new Date(parseInt(timestamp)).toLocaleDateString();
}

export const createTodo = async (req, res) => {
  try {
    const todo = await TodoTask.create({
      user_id: req.user.user_id,
      task: req.body.task,
      completed: req.body.completed,
      createdAt: TimestampToDate(req.body.date),
    });
    return success(res, todo);
  } catch (err) {
    console.log(err);
  }
};

export const getTodos = async (req, res) => {
  try {
    const todos = await TodoTask.find({
      user_id: req.user.user_id,
      createdAt: TimestampToDate(req.query.date),
    });
    return success(res, todos);
  } catch (err) {
    console.log(err);
  }
};

export const updateTodo = async (req, res) => {
  try {
    const todo = await TodoTask.findOneAndUpdate(
      { _id: req.params.id, user_id: req.user.user_id },
      req.body,
      {
        new: true,
      }
    );
    return success(res, todo);
  } catch (err) {
    console.log(err);
  }
};

export const deleteTodo = async (req, res) => {
  try {
    await TodoTask.findByIdAndRemove({
      _id: req.params.id,
      user_id: req.user.user_id,
    });
    return success(res, "todo deleted!");
  } catch (err) {
    console.log(err);
  }
};
