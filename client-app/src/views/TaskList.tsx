import React, { useEffect, useState } from "react";
import TaskItem, { Task } from "../components/TaskItem";
import Notification from "../components/Notification";
import { Link } from "react-router-dom";
import api from "../api";

const TaskList = () => {
  const [tasksList, setTasks] = useState<Task[]>([]);
  const [isNotify, setIsNotify] = useState<boolean>(false);
  const [idnr, setIdnr] = useState<number | null>();

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await api.getTasks();
        const sortedTasks = response.data.sort((a: any, b: any) =>
        a.completed === b.completed ? 0 : a.completed ? 1 : -1
      );
        setTasks(sortedTasks);
      } catch (error) {
        console.error("Error fetching tasks:", error);
      }
    };

    fetchTasks();
  }, []);

  return (
    <div className="flex flex-wrap justify-center items-center gap-3">
      <h1 className="text-2xl font-semibold mb-4 text-center w-full shadow-sm p-4">
        Tasks List
      </h1>
      {!tasksList.length && (
        <div className="text-center flex flex-col justify-center items-center gap-8 xs:gap-4 sm:gap-6 mt-4">
          <div className="flex flex-col justify-center items-center gap-4">
            <p className="text-gray-500">Your Task List Is Empty!</p>
            
          <img
            src="/empty.png" 
            alt="Empty Task List"
            className="mt-2 max-w-[400px] mx-auto xs:w-[200px] sm:w-[320px]"
          />
          </div>
          <Link
              to="/create-task"
              className="shadow-md rounded-full p-2 w-16 h-16 flex items-center justify-center"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                className="w-10 h-10"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                />
              </svg>
            </Link>
        </div>
      )}

      {tasksList.map((task) => (
        <TaskItem key={task.id} task={task} setIsNotify={setIsNotify} isNotify={isNotify} setIdnr={setIdnr}/>
      ))}
      <Notification idnr={idnr} isNotify={isNotify} setIsNotify={setIsNotify} />
    </div>
  );
};

export default TaskList;
