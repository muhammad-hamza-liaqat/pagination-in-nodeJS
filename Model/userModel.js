const mongoose = require("mongoose");

mongoose
  .connect("mongodb://localhost:27017/pagination")
  .then(() => {
    console.log("database connected");
  })
  .catch((error) => {
    console.log("database not connected!");
  });

const userSchema = new mongoose.Schema({
    name: String,
    email: String
})

const userModel = mongoose.model("User", userSchema);

module.exports = userModel