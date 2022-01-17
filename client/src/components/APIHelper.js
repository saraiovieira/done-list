import axios from "axios";
import { getCookie } from "../functions/cookie";

const API_URL = "http://localhost:5000/todos/";

let config = { headers: {Authorization : `Bearer ${getCookie("token")}`}}

async function createTodoAPI(task) {
  const { data: newTodo } = await axios.post(API_URL, {
    task
  }, config)
  return newTodo
}

async function deleteTodoAPI(id) {
  const message = await axios.delete(`${API_URL}${id}`, config)
  return message
}

async function updateTodoAPI(id, payload) {
  const { data: newTodo } = await axios.put(`${API_URL}${id}`, payload,config)
  return newTodo
}

async function getAllTodosAPI() {
  const { data: todos } = await axios.get(API_URL, config)
  return todos
}

export { createTodoAPI, deleteTodoAPI, updateTodoAPI, getAllTodosAPI}