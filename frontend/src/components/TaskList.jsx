import React from 'react';

const TaskList = ({ tasks, deleteTask }) => {
  return (
    <div className="max-w-4xl mx-auto my-8">
      <h3 className="text-3xl font-bold text-gray-800 mb-6 font-cursive text-center sketch-text">
  Task List
</h3>
      <ul className="space-y-4">
        {tasks.map((task, index) => (
          <li key={index} className="bg-white p-4 rounded-lg shadow-md sketch-border relative">
            <h4 className="text-xl font-medium text-gray-800">{task.task}</h4>
            <p className="text-gray-600">{task.description}</p>
            <p className="text-gray-500">Due: {task.dueDate}</p>
            <button
              onClick={() => deleteTask(index)}
              className="absolute top-4 right-4 text-red-500 hover:text-red-700"
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TaskList;
