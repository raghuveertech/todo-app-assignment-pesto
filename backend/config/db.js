const config = require("config");
const mongoose = require("mongoose");

const connectToDb = () => {
  try {
    mongoose.connect(config.get("mongoDBURI")).then(() => {
      console.log("Connected to DB");
    });
  } catch (error) {
    console.log("Error Connecting DB");
  }
};

module.exports = connectToDb;
