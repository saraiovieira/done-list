import React, { useState, useEffect } from "react";
import "./DoneList.css";
import {
  createTodoAPI,
  deleteTodoAPI,
  updateTodoAPI,
  getAllTodosAPI,
} from "../../Helpers/APIHelper";
import ToDos from "../../Components/ToDos";
import CalendarDate from "../../Components/CalendarDate";

const DoneList = () => {
  const [todo, setTodo] = useState("");
  const [todos, setTodos] = useState([]);
  const [date, setDate] = useState(new Date());

  useEffect(() => {
    getAllTodos();
  }, []);

  const getAllTodos = async (date = Date.now()) => {
    getAllTodosAPI(date).then((todos) => {
      setTodos(todos);
    });
  };

  const dateChanged = (date) => {
    getAllTodos(date);
    setDate(date);
  };

  const createTodo = async (e) => {
    e.preventDefault();

    if (!todo) {
      return;
    }

    const newTodo = await createTodoAPI(todo, date);
    setTodos([...todos, newTodo]);
    setTodo("");
  };

  const deleteTodo = async (e, id) => {
    try {
      e.stopPropagation();
      await deleteTodoAPI(id);
      setTodos(todos.filter(({ _id: i }) => id !== i));
    } catch (err) {}
  };

  const updateTodo = async (e, id) => {
    e.stopPropagation();
    e.preventDefault();
    const newTodo = {
      changed: !todos.find((todo) => todo._id === id).changed,
    };
    const updatedTodo = await updateTodoAPI(id, newTodo);
    setTodos(todos.map((todo) => (todo._id === id ? updatedTodo : todo)));
  };
  return (
    <>
    <div className="list-container">
      <CalendarDate dateChanged={dateChanged} />
      <ToDos
          todo={todo}
          setTodo={setTodo}
          createTodo={createTodo}
          todos={todos}
          updateTodo={updateTodo}
          deleteTodo={deleteTodo}
        />
    </div>
    </>
  );
};

export default DoneList;
