
import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./index.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import TaskList from "./views/TaskList";
import TaskCreate from "./views/TaskCreate";
import { Task } from "./components/TaskItem";
import HomePage from "./views/Home";
import TaskEdit from "./views/TaskEdit";

const App = () => {
  const [tasks, setTasks] = useState<Task[]>([]);

  const handleAddTask = (newTask: Task) => {
    setTasks([...tasks, newTask]);
  };

  return (
    <div className="container mx-auto p-4">
      <BrowserRouter>
        <header className=" mb-4 w-full bg-secondary p-4 rounded-sm">
          <h1 className="text-3xl font-semibold text-center text-primary">
            Task Management App
          </h1>
          <div className="flex justify-center items-center gap-2 uppercase text-sm mt-2">
            <Link to="/">Home</Link>
            <Link to="/tasks">Tasks</Link>
            <Link to="/create-task">Create-Task</Link>
          </div>
        </header>
        <Routes>
          <Route path="/" element={<HomePage/>}/>
          <Route path="/tasks" element={<TaskList />} />
          <Route path="/create-task" element={<TaskCreate onSubmit={handleAddTask}/>} />
          <Route path="/edit-task/:id" element={<TaskEdit/>} />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
