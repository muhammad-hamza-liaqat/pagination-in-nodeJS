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
    const {
      Make,
      Model,
      Version,
      Price,
      Make_Year,
      CC,
      Assembly,
      Mileage,
      Registered_City,
      Transmission,
    } = req.body;
    // adding these fields to the database
    const user = await carModel.create({
      ...req.body,
    });
    const result = await user.save();
    res.send(result);
    console.log(result);
  });

userRouter.route("/car/filter").get(async (req, res) => {
  try {
    const query = {};
    // const numberOfRecords = await carModel.countDocuments(query);
    // make filter
    if (req.query.Make) {
      query.Make = new RegExp(req.query.Make, "i");
    }
    // model filter
    if (req.query.Model) {
      query.Model = new RegExp(req.query.Model, "i");
    }
    // version filter
    if (req.query.Version) {
      query.Version = new RegExp(req.query.Version, "i");
    }
    // price filter
    if (req.query.Price) {
      query.Price = new RegExp(req.query.Price, "i");
    }
    // make year filter
    if (req.query.Make_Year) {
      query.Make_Year = new RegExp(req.query.Make_Year, "i");
    }
    // cc filter
    if (req.query.CC) {
      query.CC = new RegExp(req.query.CC, "i");
    }
    // assembly
    if (req.query.Assembly) {
      query.Assembly = new RegExp(req.query.Assembly, "i");
    }
    // mileage
    if (req.query.Mileage) {
      query.Mileage = new RegExp(req.query.Mileage, "i");
    }
    // registered city
    if (req.query.Registered_City) {
      query.Registered_City = new RegExp(req.query.Registered_City, "i");
    }
    // tranismmisison
    if (req.query.Transmission) {
      query.Transmission = new RegExp(req.query.Transmission, "i");
    }
    // pagination
    const page = parseInt(req.query.page) || 1;
    const pageRecords = parseInt(req.query.pageRecords) || 10;
    const skip = (page - 1) * pageRecords;
    const countQuery = { ...query };
    const cars = await carModel.find(query);
    const numberOfRecords = await carModel.countDocuments(countQuery);
    const filterNumber = {};
    for (const key in query) {
      if (Object.hasOwnProperty.call(query, key)) {
        const count = await carModel.countDocuments({ [key]: query[key] });
        filterNumber[key] = count;
      }
    }
    res.status(200).json({ numberOfRecords, filterNumber, cars });
  } catch (error) {
    console.log("error-/car/filter:", error);
    res.status(400).json({ message: "Server error-/car/filter" });
  }
});

module.exports = userRouter;

// {
//   "numberOfRecords": 1590,
//   "filterNumber": {
//       "Make": 14426,
//       "Model": 4682,
//       "Registered_City": 24993,
//       "Transmission": 37014
