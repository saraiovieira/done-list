import axios from "axios"

const apiPort = process.env.REACT_APP_API_PORT
const API_URL = `http://localhost:${apiPort}/todos/`;

let headers =  {
  Authorization : `Bearer ${localStorage.getItem("token")}`
}

function getConfig(){
  let config = {
    headers
  }
  return config;
}

async function createTodoAPI(task, date) {
  const { data: newTodo } = await axios.post(API_URL, {task, date}, getConfig())
  return newTodo
}

async function deleteTodoAPI(id) {
  const message = await axios.delete(`${API_URL}${id}`, getConfig())
  return message
}

async function updateTodoAPI(id, task) {
  const { data: newTodo } = await axios.put(`${API_URL}${id}`,{task}, getConfig())
  return newTodo
}

async function getAllTodosAPI(date) {
  const { data: todos } = await axios.get(API_URL, {headers, params: {date}})
  return todos
}

export { createTodoAPI, deleteTodoAPI, updateTodoAPI, getAllTodosAPI}