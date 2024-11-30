const mongoose = require("mongoose");

const TaskSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  title: { type: String, required: true, unique: true },
  description: { type: String },
  status: { type: String, enum: ["inprogress", "todo", "done"], required: true },
  priority: { type: String, enum: ["low", "medium", "high"], default: "low" }, // Optional with default
  dueDate: { type: Date }, // Optional
  created: { type: Date, default: Date.now },
  lastupdated: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Task", TaskSchema);
