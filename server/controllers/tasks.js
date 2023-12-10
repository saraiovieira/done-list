import { Task } from "../models/task.js";

function success(res, payload) {
  return res.status(200).json(payload);
}

function TimestampToDate(timestamp) {
  return new Date(parseInt(timestamp)).toLocaleDateString();
}

export const createTask = async (req, res) => {
  try {
    const task = await Task.create({
      user_id: req.user.user_id,
      task: req.body.task,
      createdAt: TimestampToDate(req.body.date),
    });
    return success(res, task);
  } catch (err) {
    console.log(err);
  }
};

export const getTasks = async (req, res) => {
  try {
    const tasks = await Task.find({
      user_id: req.user.user_id,
      createdAt: TimestampToDate(req.query.date),
    });
    return success(res, tasks);
  } catch (err) {
    console.log(err);
  }
};

export const updateTask = async (req, res) => {
  try {
    const task = await Task.findOneAndUpdate(
      { _id: req.params.id, user_id: req.user.user_id },
      req.body,
      {
        new: true,
      }
    );
    return success(res, task);
  } catch (err) {
    console.log(err);
  }
};

export const deleteTask = async (req, res) => {
  try {
    await Task.findByIdAndRemove({
      _id: req.params.id,
      user_id: req.user.user_id,
    });
    return success(res, "task deleted!");
  } catch (err) {
    console.log(err);
  }
};
