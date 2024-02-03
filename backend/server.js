const express = require("express");
const connectToDb = require("./config/db");

const app = express();
connectToDb(); // connect to mongodb

app.use(express.json()); // post data

// routes
app.use("/tasks", require("./routes/tasks"));

const PORT = process.env.PORT || 5050;

app.listen(PORT, () => {
  console.log(`Server Running on Port ${PORT}`);
});
