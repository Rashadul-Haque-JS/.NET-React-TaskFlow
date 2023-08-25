import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Task } from "../components/TaskItem";
import api from "../api";

const TaskEdit = () => {
  const [task, setTask] = useState<Task>();
  const { id } = useParams<{ id: any }>();
  const navigate = useNavigate();
  const formattedDueDate = task
    ? new Date(task.dueDate).toISOString().substring(0, 10)
    : "";

  useEffect(() => {
    const fetchTask = async () => {
      try {
        const response = await api.getTask(parseInt(id, 10));
        setTask(response.data);
      } catch (error) {
        console.error("Error fetching task:", error);
      }
    };
    fetchTask();
  }, [id]);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setTask((prevTask: any) => ({ ...prevTask, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await api.updateTask(task?.id || 0, task!);
      navigate("/tasks");
      console.log("Task updated:", response.data);
    } catch (error) {
      console.error("Error updating task:", error);
    }
  };

  return (
    <div className="w-full max-w-md mx-auto p-4">
      <h1 className="text-2xl font-semibold mb-4 text-center w-full shadow-sm p-4">
        Edit Task <span className="text-secondary block">#{task?.id}</span>
      </h1>
      <form
        onSubmit={handleSubmit}
        className="bg-secondary shadow-md rounded px-8 pt-6 pb-8 mb-4"
      >
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="title"
          >
            Title
          </label>
          <input
            className="appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline"
            type="text"
            id="title"
            name="title"
            value={task?.title || ""}
            onChange={handleInputChange}
            required
            minLength={6}
            maxLength={24}
          />
        </div>
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="description"
          >
            Description
          </label>
          <textarea
            className="appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline"
            id="description"
            name="description"
            value={task?.description || ""}
            onChange={handleInputChange}
            minLength={10}
            maxLength={250}
          />
        </div>
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="dueDate"
          >
            Due Date
          </label>
          <input
            className="appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline"
            type="date"
            id="dueDate"
            name="dueDate"
            value={formattedDueDate}
            onChange={handleInputChange}
          />
        </div>
        <div className="flex justify-between items-center">
          <button
            className=" hover:bg-[#1abc9c] text-primary font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline shadow hover:shadow-lg"
            type="button"
            onClick={() => navigate("/tasks")}
          >
            Cancel
          </button>
          <button
            className="bg-tertiary text-primary font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline hover:shadow-lg"
            type="submit"
          >
            Update
          </button>
        </div>
      </form>
    </div>
  );
};

export default TaskEdit;
