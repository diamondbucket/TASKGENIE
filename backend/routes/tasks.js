const express = require('express');
const Task = require('../models/Task');
const authMiddleware = require('../middleware/auth'); // This will verify JWT token

const router = express.Router();

// Middleware to protect routes
router.use(authMiddleware);

// Create a new task
router.post('/', async (req, res) => {
  const { title, description } = req.body;
  const userId = req.user.id; // Assuming that the user is authenticated and user id is stored in req.user

  try {
    const newTask = new Task({
      title,
      description,
      userId,
    });
    await newTask.save();
    res.status(201).json(newTask);
  } catch (err) {
    res.status(500).json({ message: 'Server error while creating task' });
  }
});

// Get all tasks for the logged-in user
router.get('/', async (req, res) => {
  const userId = req.user.id;

  try {
    const tasks = await Task.find({ userId });
    res.json(tasks);
  } catch (err) {
    res.status(500).json({ message: 'Server error while fetching tasks' });
  }
});

// Update a task (for example: marking it as completed)
router.put('/:id', async (req, res) => {
  const { id } = req.params;
  const { title, description, completed } = req.body;
  const userId = req.user.id;

  try {
    const task = await Task.findOneAndUpdate(
      { _id: id, userId }, // Make sure the task belongs to the user
      { title, description, completed },
      { new: true } // Return the updated task
    );

    if (!task) {
      return res.status(404).json({ message: 'Task not found' });
    }

    res.json(task);
  } catch (err) {
    res.status(500).json({ message: 'Server error while updating task' });
  }
});

// Delete a task
router.delete('/:id', async (req, res) => {
  const { id } = req.params;
  const userId = req.user.id;

  try {
    const task = await Task.findOneAndDelete({ _id: id, userId });

    if (!task) {
      return res.status(404).json({ message: 'Task not found' });
    }

    res.json({ message: 'Task deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Server error while deleting task' });
  }
});

module.exports = router;
