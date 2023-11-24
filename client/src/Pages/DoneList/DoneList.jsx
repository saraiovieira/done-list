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

  const getAllTasksGuest = () => {
      const savedTasks = localStorage.getItem("tasks");
      if (savedTasks) {
        setTasks(JSON.parse(savedTasks));
      } else {
        return [];
      }
  };

  const dateChanged = (date) => {
    let newDate = new Date(date).toLocaleDateString();
    let newTasks = tasks.filter((task) => new Date(task.id).toLocaleDateString() === newDate);
    setTasks(newTasks);
    setDate(date);
  };

  const createTask = async (e) => {
    e.preventDefault();
   
    if (task) {
      const token = localStorage.getItem("token");
      if(token === "guest") {
        const newTask = { title: task, id: Date.now() };
        setTasks([...tasks, newTask]);
        setTask("");
        localStorage.setItem("tasks", JSON.stringify([...tasks, newTask]));
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
