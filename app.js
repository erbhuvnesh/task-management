const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const { errorHandler } = require("./app/middlewares/error.middleware");
const taskRoutes = require("./app/routes/task.routes");
const { connectDB } = require("./utils/database");

const app = express();
const PORT = 5000;

// Middlewares
app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

// Database Connection
connectDB();

// Routes
app.use("/api/tasks", taskRoutes);

// Error Handling Middleware
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
