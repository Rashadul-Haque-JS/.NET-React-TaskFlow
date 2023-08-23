import React from 'react';

const HomePage: React.FC = () => {
  return (
    <div className="bg-gray-100 min-h-screen flex items-start justify-center">
      <div className="bg-white p-6 rounded-lg shadow-md text-center mt-4">
        <h1 className="text-2xl font-semibold mb-4">Welcome to Your Task Management App</h1>
        <p className="text-gray-700">Stay organized and productive!</p>
        <img
          src="/tasks.png" // Replace with the actual path to your image
          alt="Task Management"
          className="mt-8 mx-auto w-auto max-w-sm h-[440px] xs:h-[380] sm:h-[400]"
        />
      </div>
    </div>
  );
};

export default HomePage;
