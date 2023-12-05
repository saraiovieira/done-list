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
    const token = localStorage.getItem("token");
    if(token === "guest") {
      getAllTasksGuest();
    } else {
      getAllTasksUser();
    }
  }, []);

  const getAllTasksUser = async (date = Date.now()) => {
      getAllTasksAPI(date).then((tasks) => {
        setTasks(tasks);
      });
  };

  const getAllTasksGuest = (date = Date.now()) => {
      const savedTasks = localStorage.getItem("tasks");
      console.log("Local Storage Content:", localStorage.getItem("tasks"));
      const allTasks = JSON.parse(savedTasks) || [];
      console.log("All tasks from local storage:", allTasks);
      const targetDate = new Date(date).toLocaleDateString();
      const tasksForDate = allTasks.filter(task => new Date(task.date).toLocaleDateString() === targetDate);
      return Promise.resolve(tasksForDate).then((tasks) => {
        setTasks(tasks);
      });
  };

  const formatDate = (date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Ensure zero-padding
    const day = String(date.getDate()).padStart(2, '0'); // Ensure zero-padding
    return `${day}/${month}/${year}`;
  };

  const createTask = async (e) => {
    e.preventDefault();
  
    if (task) {
      const token = localStorage.getItem("token");
      if(token === "guest") {
        // Create a new task object with title, date, and id
        const newTask = { title: task, date: date, id: Date.now() };

        // Update state with the new task
        setTasks((prevTasks) => [...prevTasks, newTask]);

        // Clear the task input
        setTask("");

        // Update local storage with the new tasks
      const updatedTasks = [...tasks, newTask];
      localStorage.setItem("tasks", JSON.stringify(updatedTasks));
    } else {
      const newTask = await createTaskAPI(task, date);
      setTasks([...tasks, newTask]);
      setTask("");
    }
    } else {
      return;
    }
  };

  const deleteTask = async (e, id) => {
    const token = localStorage.getItem("token");
    if(token === "guest") {
      let deletedTasks = tasks.filter(({ id: i }) => id !== i);
      setTasks(deletedTasks);
      localStorage.setItem("tasks", JSON.stringify(deletedTasks));
    } else {
      try {
        e.stopPropagation();
        await deleteTaskAPI(id);
        setTasks(tasks.filter(({ _id: i }) => id !== i));
      } catch (err) {}
    }
  };

  const updateTask = async (e, id) => {
    e.stopPropagation();
    e.preventDefault();
    const token = localStorage.getItem("token");
    if(token === "guest") {
      let newTasks = tasks.filter(({ _id: i }) => id !== i);
      setTasks(newTasks);
    } else {
      try {
        e.stopPropagation();
        await deleteTaskAPI(id);
        setTasks(tasks.filter(({ _id: i }) => id !== i));
      } catch (err) { 
        const newTask = {
          changed: !tasks.find((task) => task._id === id).changed,
        };
        const updatedTask = await updateTaskAPI(id, newTask);
        setTasks(tasks.map((task) => (task._id === id ? updatedTask : task)));
      }
    }
  };

  const dateChanged = async (date) => {
    try {
      getAllTasksGuest(date);
      setDate(date);
  
      // Resolve the Promise with the filtered tasks
    } catch (error) {
      console.error("Error in dateChanged function:", error);
      return Promise.reject(error);
    }
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
