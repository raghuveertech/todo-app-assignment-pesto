const express = require("express");

const app = express();

// routes
app.use("/tasks", require("./routes/tasks"));

const PORT = process.env.PORT || 5050;

app.listen(PORT, () => {
  console.log(`Server Running on Port ${PORT}`);
});
