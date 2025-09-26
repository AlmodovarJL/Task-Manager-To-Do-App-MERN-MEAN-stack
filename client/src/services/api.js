import axios from "axios";

const API = axios.create({
  baseURL: "https://task-manager-to-do-app-mern-mean-stack.onrender.com/api",
});

// Automatically attach token if present
API.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

// Task APIs
export const getTasks = () => API.get("/tasks");
export const addTask = (task) => API.post("/tasks", task);
export const updateTask = (id, updatedTask) =>
  API.put(`/tasks/${id}`, updatedTask);
export const deleteTask = (id) => API.delete(`/tasks/${id}`);

// Auth APIs
export const register = (userData) => API.post("/auth/register", userData);
export const login = (userData) => API.post("/auth/login", userData);
