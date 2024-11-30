const Task = require("../app/models/task.model");

const getTasksByUserId = async (userId) => {
  return await Task.find({ userId });
};

const getAllTasks = async () => {
  const tasksList =  await Task.find();
  return tasksList.map(task => task.title)
};

const createTask = async (taskData) => {
  const task = new Task(taskData);
  return await task.save();
};

const updateTask = async (id, updatedData) => {
  return await Task.findByIdAndUpdate(id, updatedData, { new: true });
};

const deleteTask = async (id) => {
  return await Task.findByIdAndDelete(id);
};

module.exports = { getTasksByUserId, getAllTasks, createTask, updateTask, deleteTask };
