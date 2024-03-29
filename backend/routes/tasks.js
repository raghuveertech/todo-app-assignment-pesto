const express = require("express");
const { check, validationResult } = require("express-validator");
const Task = require("../models/Task");

const router = express.Router();

/*
  End point:    /tasks
  Method:       GET
  Description:  Send all existing tasks
*/

router.get("/", async (req, res) => {
  try {
    return res.json(await Task.find());
  } catch (error) {
    console.log(error);
    res.send("Server Error");
  }
});

/*
  End point:    /tasks
  Method:       POST
  Description:  Create new task/Update exiting task, based on id from body
After creating/updating a task, return all tasks
  */

router.post(
  "/",
  // validating
  [
    check("title", "Title is required").trim().not().isEmpty(),
    check("status", "Invalid Status").custom((value) => {
      return value === 1 || value === 2 || value === 3;
    }),
  ],

  async (req, res) => {
    const result = validationResult(req);
    if (!result.isEmpty()) {
      // if any validation errors
      return res.status(400).send({ errors: result.array() });
    }
    const { _id, title, status, description } = req.body;
    let task; // task we send to mongo db

    try {
      if (!_id) {
        // new instance if no id
        task = new Task({
          title,
          status,
          description,
        });
      } else {
        // get task from mongodb by id
        task = await Task.findById(_id);
        task.title = title;
        task.status = status;
        task.description = description;
      }

      const savedTask = await task.save();
      if (savedTask._id) {
        return res.json(await Task.find()); // send all tasks as response after creating a task to avoid another API call
      }
    } catch (error) {
      console.log(error);
      res.send("Server Error");
    }
  }
);

/*
  End point:    /tasks/:_id
  Method:       DELETE
  Description:  Delete a task based on id. After deleting a task, return all tasks
  */

router.delete("/:_id", async (req, res) => {
  try {
    const deletedTask = await Task.findByIdAndDelete(req.params._id);
    if (deletedTask._id) {
      return res.json(await Task.find()); // send all tasks as response after deleting a task
    }
  } catch (error) {
    console.log(error);
    res.send("Server Error");
  }
});

module.exports = router;
