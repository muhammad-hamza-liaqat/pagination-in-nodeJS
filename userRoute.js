const express = require("express");
const app = express();
const mongoose = require("./Model/userModel");
const carModel = require("./Model/userModel");
const userRouter = express.Router();

userRouter
  .route("/user")
  .get(async (req, res) => {
    const { page = 1, limit = 10 } = req.query;
    const users = await carModel
      .find({})
      .limit(limit * 1)
      .skip(page - 1);
    res.json(users);
    // pass page and limit in the params in postman or any IDE for testing the APIs. limit to display number of data and page for how many will diplay in page one
  })
  .post(async (req, res) => {
    const { Make,Model, Version, Price, Make_Year, CC, Assembly, Mileage, Registered_City, Transmission } = req.body;
    // adding these fields to the database
    const user = await carModel.create({
      ...req.body,
    });
    const result = await user.save();
    res.send(result);
    console.log(result);
  });

userRouter.route("/simple").get(async (req, res) => {
  const user = await carModel.find(req.query);
  res.status(200).json({ user });
});


module.exports = userRouter;
