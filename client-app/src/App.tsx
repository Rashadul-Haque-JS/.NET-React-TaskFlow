
import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./index.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import TaskList from "./views/TaskList";
import TaskForm from "./views/TaskForm";
import { Task } from "./components/TaskItem";
import HomePage from "./views/Home";

const App = () => {
  const [tasks, setTasks] = useState<Task[]>([]);

  const handleAddTask = (newTask: Task) => {
    setTasks([...tasks, newTask]);
  };

  return (
    <div className="container mx-auto p-4">
      <BrowserRouter>
        <header className=" mb-4 w-full bg-sky-600 p-4">
          <h1 className="text-3xl font-semibold text-center text-white">
            Task Management App
          </h1>
          <div className="flex justify-center items-center gap-2 uppercase text-sm mt-2">
            <Link to="/">Home</Link>
            <Link to="/tasks">Tasks</Link>
            <Link to="/create-task">Create-Tasks</Link>
          </div>
        </header>
        <Routes>
          <Route path="/" element={<HomePage/>}/>
          <Route path="/tasks" element={<TaskList />} />
          <Route path="/create-task" element={<TaskForm onSubmit={handleAddTask}/>} />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
