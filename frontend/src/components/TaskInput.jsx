import React, { useState } from 'react';

const TaskInput = ({ addTask }) => {
  const [task, setTask] = useState('');
  const [description, setDescription] = useState('');
  const [dueDate, setDueDate] = useState('');

  const handleAddTask = (e) => {
    e.preventDefault();
    if (!task) return; // Don't add if task is empty
    addTask({ task, description, dueDate });
    setTask('');
    setDescription('');
    setDueDate('');
  };

  return (
    <div className="p-8 bg-white shadow-lg rounded-lg max-w-md mx-auto">
      <h3 className="text-3xl font-bold font-cursive sketch-text text-center mb-6">Task List</h3>
      <form onSubmit={handleAddTask} className="space-y-6">
        {/* Task Title */}
        <div className="space-y-2">
          <label htmlFor="task" className="block text-lg text-gray-700 font-medium">
            Task Title
          </label>
          <input
            id="task"
            type="text"
            className="w-full px-4 py-3 border-2 border-transparent rounded-md outline-none sketch-border focus:ring-2 focus:ring-gray-500 focus:border-gray-500"
            value={task}
            onChange={(e) => setTask(e.target.value)}
            placeholder="Enter task title"
          />
        </div>

        {/* Description */}
        <div className="space-y-2">
          <label htmlFor="description" className="block text-lg text-gray-700 font-medium">
            Description
          </label>
          <textarea
            id="description"
            className="w-full px-4 py-3 border-2 border-transparent rounded-md outline-none sketch-border focus:ring-2 focus:ring-gray-500 focus:border-gray-500"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Describe the task"
          />
        </div>

        {/* Due Date */}
        <div className="space-y-2">
          <label htmlFor="dueDate" className="block text-lg text-gray-700 font-medium">
            Due Date
          </label>
          <input
            id="dueDate"
            type="date"
            className="w-full px-4 py-3 border-2 border-transparent rounded-md outline-none sketch-border focus:ring-2 focus:ring-gray-500 focus:border-gray-500"
            value={dueDate}
            onChange={(e) => setDueDate(e.target.value)}
          />
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full py-3 mt-4 text-white bg-blue-500 hover:bg-blue-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          Add Task
        </button>
      </form>
    </div>
  );
};

export default TaskInput;
