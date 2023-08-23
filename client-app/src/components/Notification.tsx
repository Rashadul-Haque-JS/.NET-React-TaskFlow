import React from "react";
import api from "../api";

const Notification = ({ idnr, isNotify, setIsNotify }: any) => {
  if (!isNotify) {
    return null; // Don't render anything if isNotify is false
  }

  const handleDelete = async () => {
    try {
      await api.deleteTask(idnr);
      setIsNotify(false);
      window.location.reload();
    } catch (error) {
      console.error("Error creating task:", error);
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50 ">
      <div className="bg-white p-6 rounded shadow-lg">
        <div className="text-black text-xl font-semibold mb-6">
          Are you ok with delete!
        </div>
        <div className="flex justify-between items-center">
          <button className="text-sm shadow-md px-2 py-1 rounded-sm cursor-pointer" onClick={()=>setIsNotify(false)}>Cancel</button>
          <button
            onClick={handleDelete}
            className="bg-black text-white py-2 px-4 rounded hover:bg-black-400 transition duration-300 cursor-pointer"
          >
            OK
          </button>
        </div>
      </div>
    </div>
  );
};

export default Notification;
