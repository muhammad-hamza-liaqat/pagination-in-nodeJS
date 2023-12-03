const mongoose = require("mongoose");


// database connection .... 
mongoose
  .connect("mongodb://localhost:27017/pagination")
  .then(() => {
    console.log("database connected");
  })
  .catch((error) => {
    console.log("database not connected!");
  });


// schema
const carSchema = new mongoose.Schema({
    Make: String,
    Model: String,
    Version: String,
    Price: Number,
    Make_Year: String,
    CC : String,
    Assembly: String,
    Mileage: String,
    Registered_City: String,
    Transmission: String
})

const carModel = mongoose.model("Car", carSchema);

module.exports = carModel