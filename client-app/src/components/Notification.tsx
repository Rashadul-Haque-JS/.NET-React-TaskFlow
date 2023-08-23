import React from 'react';
import api from '../api';

const Notification = ({idnr,isNotify, setIsNotify }: any) => {

  if (!isNotify) {
    return null; // Don't render anything if isNotify is false
  }

  const handleDelete = async () => {
    try {
      await api.deleteTask(idnr);
      setIsNotify(false);
      window.location.reload();
    } catch (error) {
      console.error('Error creating task:', error);
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded shadow-lg">
        <div className="text-yellow-500 text-xl font-semibold mb-3">
          Are you ok with delete!
        </div>
        <button
          onClick={handleDelete}
          className="bg-yellow-500 text-white py-2 px-4 rounded hover:bg-yellow-600 transition duration-300"
        >
          OK
        </button>
      </div>
    </div>
  );
};

export default Notification;
