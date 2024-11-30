const taskService = require("../../services/task.service");

const getTasks = async (req, res, next) => {
  try {
    const { userId } = req.query; // Accept userId as query parameter
    if (!userId) {
      return res.status(400).json({ error: "User ID is required" });
    }
    const tasks = await taskService.getTasksByUserId(userId);
    res.status(200).json(tasks);
  } catch (error) {
    next(error);
  }
};

const getAllTasks = async (req, res, next) => {
    try {
      const tasks = await taskService.getAllTasks();
      res.status(200).json(tasks);
    } catch (error) {
      next(error);
    }
  };

const addTask = async (req, res, next) => {
  try {
    const task = await taskService.createTask(req.body);
    res.status(201).json(task);
  } catch (error) {
    next(error);
  }
};

const editTask = async (req, res, next) => {
  try {
    const updatedTask = await taskService.updateTask(req.params.id, req.body);
    res.status(200).json(updatedTask);
  } catch (error) {
    next(error);
  }
};

const deleteTask = async (req, res, next) => {
  try {
    await taskService.deleteTask(req.params.id);
    res.status(204).send();
  } catch (error) {
    next(error);
  }
};

module.exports = { getTasks, addTask, editTask, deleteTask, getAllTasks };
