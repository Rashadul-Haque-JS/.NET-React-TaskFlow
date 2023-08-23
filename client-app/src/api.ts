import axios from 'axios';
import { Task } from './components/TaskItem';
const API_BASE_URL = `${process.env.REACT_APP_API_PROXY}/api`; 

const axiosInstance = axios.create({
  baseURL: API_BASE_URL,
});

const api = {
  getTasks: () => axiosInstance.get('/tasks'),
  createTask: (task:Task) => axiosInstance.post('/tasks', task),
  updateTask: (id:number, task:Task) => axiosInstance.put(`/tasks/${id}`, task),
  deleteTask: (id:number) => axiosInstance.delete(`/tasks/${id}`),
};

export default api;
