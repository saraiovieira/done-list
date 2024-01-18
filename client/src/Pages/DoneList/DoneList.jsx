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
  const [editedTask, setEditedTask] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token !== "guest") {
      getAllTasksUser();
    }
  }, []);

  const getAllTasksUser = async (targetDate = Date.now()) => {
    try {
      const tasks = await getAllTasksAPI(targetDate);
      setTasks(tasks);
    } catch (error) {
      console.error("Error retrieving tasks:", error);
    }
  };

  const getAllTasksGuest = (targetDate = Date.now()) => {
    const savedTasks = JSON.parse(localStorage.getItem("tasks")) || [];
    const tasksForDate = savedTasks.filter((task) => task.date === targetDate);
    setTasks(tasksForDate);
  };

  const createTask = async (e) => {
    e.preventDefault();

    if (task) {
      const token = localStorage.getItem("token");
      if (token === "guest") {
        const newTask = { title: task, date: date, id: Date.now() };

        setTasks((prevTasks) => [...prevTasks, newTask]);

        setTask("");

        const savedTasks = localStorage.getItem("tasks");
        const allTasks = savedTasks ? JSON.parse(savedTasks) : [];

        const updatedTasks = [...allTasks, newTask];
        localStorage.setItem("tasks", JSON.stringify(updatedTasks));
      } else {
        const newTask = await createTaskAPI(task, date);
        setTasks([...tasks, newTask]);
        setTask("");
      }
    } else {
      alert("Task is empty");
    }
  };

  const deleteTask = async (e, id) => {
    const token = localStorage.getItem("token");
    if (token === "guest") {
      const deletedTasks = tasks.filter((t) => t.id !== id);
      setTasks(deletedTasks);
      localStorage.setItem("tasks", JSON.stringify(deletedTasks));
    } else {
      try {
        await deleteTaskAPI(id);
        setTasks(tasks.filter((t) => t._id !== id));
      } catch (error) {
        console.error("Error deleting task:", error);
      }
    }
  };

  const updateTask = async (e, id) => {
    const token = localStorage.getItem("token");

    if (token === "guest") {
      if (editedTask) {
        setTasks((prevTasks) =>
          prevTasks.map((task) =>
            task.id === editedTask.id ? { ...task, title: editedTask.title } : task
          )
        );
        setEditedTask(null);

        const savedTasks = localStorage.getItem("tasks");
        const allTasks = JSON.parse(savedTasks) || [];

        const updatedTasks = allTasks.map((task) =>
          task.id === editedTask.id ? { ...task, title: editedTask.title } : task
        );

        localStorage.setItem("tasks", JSON.stringify(updatedTasks));
      }
    } else {
      try {
        e.stopPropagation();
        const updatedTask = await updateTaskAPI(id, editedTask.task);

        setTasks((prevTasks) =>
          prevTasks.map((task) =>
            task._id === id ? { ...task, task: updatedTask.task } : task
          )
        );

        setEditedTask(null);
      } catch (err) {
        console.error("Error updating task:", err);
      }
    }
  };

  const dateChanged = async (newDate) => {
    const token = localStorage.getItem("token");
    if (token === "guest") {
      getAllTasksGuest(newDate);
    } else {
      getAllTasksUser(newDate);
    }
    setDate(newDate);
  };

  return (
    <div className="done-list__container">
      <Tasks
        task={task}
        setTask={setTask}
        createTask={createTask}
        tasks={tasks}
        updateTask={updateTask}
        deleteTask={deleteTask}
        editedTask={editedTask}
        setEditedTask={setEditedTask}
      />
      <CalendarDate dateChanged={dateChanged} />
    </div>
  );
};

export default DoneList;