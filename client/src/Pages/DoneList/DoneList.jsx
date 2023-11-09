import React, { useState, useEffect } from "react";
import "./DoneList.css";
import {
  createTaskAPI,
  deleteTaskAPI,
  updateTaskAPI,
  getAllTasksAPI,
} from "../../Helpers/APIHelper";
import Tasks from "../../Components/Tasks";
import CalendarDate from "../../Components/CalendarDate";

const DoneList = () => {
  const [task, setTask] = useState("");
  const [tasks, setTasks] = useState([]);
  const [date, setDate] = useState(new Date());

  useEffect(() => {
    getAllTasks();
  }, []);

  const getAllTasks = async (date = Date.now()) => {
    getAllTasksAPI(date).then((tasks) => {
      setTasks(tasks);
    });
  };

  const dateChanged = (date) => {
    getAllTasks(date);
    setDate(date);
  };

  const createTask = async (e) => {
    e.preventDefault();

    if (!task) {
      return;
    }

    const newTask = await createTaskAPI(task, date);
    setTasks([...tasks, newTask]);
    setTask("");
  };

  const deleteTask = async (e, id) => {
    try {
      e.stopPropagation();
      await deleteTaskAPI(id);
      setTasks(tasks.filter(({ _id: i }) => id !== i));
    } catch (err) {}
  };

  const updateTask = async (e, id) => {
    e.stopPropagation();
    e.preventDefault();
    const newTask = {
      changed: !tasks.find((task) => task._id === id).changed,
    };
    const updatedTask = await updateTaskAPI(id, newTask);
    setTasks(tasks.map((task) => (task._id === id ? updatedTask : task)));
  };
  return (
    <>
    <div className="list-container">
      <CalendarDate dateChanged={dateChanged} />
      <Tasks
          task={task}
          setTask={setTask}
          createTask={createTask}
          tasks={tasks}
          updateTask={updateTask}
          deleteTask={deleteTask}
        />
    </div>
    </>
  );
};

export default DoneList;
