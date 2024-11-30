const express = require("express");
const { getTasks, addTask, editTask, deleteTask, getAllTasks } = require("../controllers/task.controller");
const { requestLogger, sanitizeRequest } = require("../middlewares/logger.middleware");

const router = express.Router();

// Use middlewares
router.use(requestLogger);
router.use(sanitizeRequest);

// Task APIs
router.get("/", getTasks);       // Get tasks for a user
router.post("/", addTask);       // Add a new task
router.put("/:id", editTask);    // Update a task
router.delete("/:id", deleteTask); // Delete a task
router.get("/all", getAllTasks) // Get all tasks name list

module.exports = router;
