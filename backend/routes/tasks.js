const express = require("express");

const router = express.Router();

/*
  End point:   /tasks/
  Method:      GET
*/

router.get("/", (req, res) => {
  res.send("Tasks Route");
});

module.exports = router;
