const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
});

const Task = mongoose.model("tasks", taskSchema);
module.exports = Task;
