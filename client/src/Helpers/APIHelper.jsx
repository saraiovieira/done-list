import axios from "axios"

const API_URL = `http://localhost:${process.env.REACT_APP_API_PORT}/tasks/`;


let AxiosInstance = axios.create({
  baseURL: API_URL
});

AxiosInstance.interceptors.request.use(function (config) {
  let token = localStorage.getItem("token");
  config.headers["Authorization"] = "Bearer " + token;
  return config;
});


async function createTaskAPI(task, date) {
  const { data: newTask } = await AxiosInstance.post(API_URL, {task, date});

  return newTask;
}

async function deleteTaskAPI(id) {
  const message = await AxiosInstance.delete(`${API_URL}${id}`)
  return message;
}

async function updateTaskAPI(id, task) {
    const  { data: newTask } = await AxiosInstance.put(`${API_URL}${id}`, { task });
    return newTask;
}

async function getAllTasksAPI(date) {
  const { data: tasks } = await AxiosInstance.get(API_URL, { params: {date}})
  return tasks;
}

export { createTaskAPI, deleteTaskAPI, updateTaskAPI, getAllTasksAPI}