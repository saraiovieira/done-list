import axios from "axios"

const apiPort = process.env.REACT_APP_API_PORT
const API_URL = `http://localhost:${apiPort}/todos/`;


let AxiosInstance = axios.create({
  baseURL: API_URL
});

AxiosInstance.interceptors.request.use(function (config) {
  let token = localStorage.getItem("token");
  config.headers["Authorization"] = "Bearer " + token;
  return config;
});


async function createTodoAPI(task, date) {
  const { data: newTodo } = await AxiosInstance.post(API_URL, {task, date});

  return newTodo;
}

async function deleteTodoAPI(id) {
  const message = await AxiosInstance.delete(`${API_URL}${id}`)
  return message
}

async function updateTodoAPI(id, task) {
  const { data: newTodo } = await AxiosInstance.put(`${API_URL}${id}`,{task})
  return newTodo
}

async function getAllTodosAPI(date) {
  const { data: todos } = await AxiosInstance.get(API_URL, { params: {date}})
  return todos
}

export { createTodoAPI, deleteTodoAPI, updateTodoAPI, getAllTodosAPI}