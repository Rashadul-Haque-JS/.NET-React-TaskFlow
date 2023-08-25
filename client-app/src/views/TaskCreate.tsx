import React, { useState } from 'react';
import { Task } from '../components/TaskItem';
import api from '../api';

interface CreateTaskProps {
  onSubmit: (task: Task) => void;
}

const CreateTask: React.FC<CreateTaskProps> = ({ onSubmit }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [dueDate, setDueDate] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const newTask: Task = {
      title,
      description,
      dueDate,
      completed: false,
    };

    try {
      const response = await api.createTask(newTask);
      console.log('New task created:', response.data);
      onSubmit(response.data); // Assuming `onSubmit` handles the new task
      setTitle('');
      setDescription('');
      setDueDate('');
    } catch (error) {
      console.error('Error creating task:', error);
    }
  };

  return (
    <div className="w-full max-w-md mx-auto p-4">
      <h1 className="text-2xl font-semibold mb-4 text-center w-full shadow-sm p-4">
        Create Task
      </h1>
    <form onSubmit={handleSubmit} className="bg-secondary shadow-md rounded px-8 pt-6 pb-8 mb-4">
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="title">
          Title
        </label>
        <input
          className="appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline"
          type="text"
          id="title"
          value={title}
          onChange={(e) => setTitle(e.target.value.toLocaleLowerCase())}
          required
          minLength={6}
          maxLength={24}
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="description">
          Description
        </label>
        <textarea
          className="appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline"
          id="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          minLength={10}
          maxLength={250}
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="dueDate">
          Due Date
        </label>
        <input
          className="appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline"
          type="date"
          id="dueDate"
          value={dueDate}
          onChange={(e) => setDueDate(e.target.value)}
        />
      </div>
      <button
        className="bg-tertiary text-primary font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline hover:shadow-lg"
        type="submit"
      >
        Add Task
      </button>
    </form>
  </div>
  );
};

export default CreateTask;
