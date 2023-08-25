import React, { useState } from "react";
import api from "../api";
import { TrashIcon, EditIcon } from "../miscellaneous/icon";
import { Link } from "react-router-dom";
export interface Task {
  id?: any;
  title: string;
  description: string;
  dueDate: string;
  completed?: boolean;
}

interface TaskItemProps {
  task: Task;
  isNotify: boolean;
  setIsNotify: (value: boolean) => void;
  setIdnr: (value: number) => void;
}

const TaskItem = ({ task, setIsNotify, setIdnr }: TaskItemProps) => {
  const [completed, setCompleted] = useState(task.completed);

  const handleTask = async () => {
    const updatedTask = { ...task, completed: !completed };
    // Update local state
    setCompleted(!completed);

    try {
      await api.updateTask(task.id, updatedTask);
    } catch (error) {
      console.error("Error creating task:", error);
    }
  };

  const handleNotify = () => {
    setIsNotify(true);
    setIdnr(task.id);
  };

  return (
    <div
      className={`text-tertiary bg-secondary p-4 shadow rounded-sm mb-4 w-[380px] h-[300px] gap-4 relative`}
    >
      <div className={`${completed ? "opacity-50" : "opacity-100"}`}>
        <div className="flex justify-between items-center">
          <h2 className="text-md font-semibold uppercase">{task.title}</h2>
          <h2 className="text-md font-semibold">#{task.id}</h2>
        </div>
        <p className="text-gray-600">Due on: {task.dueDate.substring(0, 10)}</p>
        <div className="w-full h-[150px] bg-[#F6F2E3] p-2 mt-3 border border-solid border-black rounded">
          <p className="mt-2">{task.description}</p>
        </div>
      </div>
      <div className="flex justify-between absolute left-3 bottom-3 gap-8">
        <label
          className="flex items-center cursor-pointer"
          onClick={handleTask}
        >
          <input
            type="checkbox"
            className="mr-2 form-checkbox h-5 w-5"
            checked={completed}
            readOnly
            aria-label={`Mark task "${task.title}" as completed`}
          />
          Completed
        </label>
        <Link to={`/edit-task/${task.id}`}
          className=" text-black flex items-center cursor-pointer gap-2 hover:shadow-lg"
          onClick={handleNotify}
          aria-label={`Delete task "${task.title}"`}
        >
          <EditIcon />
          Edit
        </Link>
        <button
          className=" text-black flex items-center cursor-pointer gap-2 hover:shadow-lg"
          onClick={handleNotify}
          aria-label={`Delete task "${task.title}"`}
        >
          <TrashIcon />
          Delete
        </button>
      </div>
    </div>
  );
};

export default TaskItem;
