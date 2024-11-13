import React, { useState, useEffect } from 'react';
import axios from 'axios';
import TaskList from './TaskList';
import TaskInput from './TaskInput';

const TasksPage = () => {
  const [tasks, setTasks] = useState([]);
  const [taskInput, setTaskInput] = useState('');

  useEffect(() => {
    // Fetch tasks when the page loads
    const fetchTasks = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/tasks', {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('authToken')}`,
          },
        });
        setTasks(response.data);
      } catch (err) {
        console.error('Error fetching tasks:', err);
      }
    };
    fetchTasks();
  }, []);

  const addTask = async () => {
    try {
      const newTask = { title: taskInput };
      const response = await axios.post(
        'http://localhost:5000/api/tasks',
        newTask,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('authToken')}`,
          },
        }
      );
      setTasks([...tasks, response.data]);
      setTaskInput('');
    } catch (err) {
      console.error('Error adding task:', err);
    }
  };

  const deleteTask = async (taskId) => {
    try {
      await axios.delete(`http://localhost:5000/api/tasks/${taskId}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('authToken')}`,
        },
      });
      setTasks(tasks.filter((task) => task._id !== taskId));
    } catch (err) {
      console.error('Error deleting task:', err);
    }
  };

  return (
    <div className="container mx-auto px-4 py-10 flex space-x-8">
      <div className="flex-1">
        <TaskList tasks={tasks} deleteTask={deleteTask} />
      </div>
      <div className="w-1/3">
        <TaskInput addTask={addTask} taskInput={taskInput} setTaskInput={setTaskInput} />
      </div>
    </div>
  );
};

export default TasksPage;
