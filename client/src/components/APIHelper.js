import axios from "axios";

const API_URL = "http://localhost:5000/todos/";

function getConfig(){
  let config = {
    headers: {
      Authorization : `Bearer ${localStorage.getItem("token")}`
    }
  }
  return config;
}

async function createTodoAPI(task) {
  const { data: newTodo } = await axios.post(API_URL, {task}, getConfig())
  return newTodo
}

async function deleteTodoAPI(id) {
  const message = await axios.delete(`${API_URL}${id}`, getConfig())
  return message
}

async function updateTodoAPI(id, payload) {
  const { data: newTodo } = await axios.put(`${API_URL}${id}`, payload,getConfig())
  return newTodo
}

async function getAllTodosAPI() {
  const { data: todos } = await axios.get(API_URL, getConfig())
  return todos
}

export { createTodoAPI, deleteTodoAPI, updateTodoAPI, getAllTodosAPI}