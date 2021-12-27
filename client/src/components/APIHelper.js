import axios from "axios";

const API_URL = "http://localhost:5000/todos/"

async function createTodoAPI(task) {
  const { data: newTodo } = await axios.post(API_URL, {
    task,
  })
  return newTodo
}

async function deleteTodoAPI(id) {
  const message = await axios.delete(`${API_URL}${id}`)
  return message
}

async function updateTodoAPI(id, payload) {
  const { data: newTodo } = await axios.put(`${API_URL}${id}`, payload)
  return newTodo
}

async function getAllTodosAPI() {
  const { data: todos } = await axios.get(API_URL)
  return todos
}

export { createTodoAPI, deleteTodoAPI, updateTodoAPI, getAllTodosAPI}