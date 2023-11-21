const express = require("express");
const app = express();
const mongoose = require("./Model/userModel");
const userModel = require("./Model/userModel");
const userRouter = express.Router();

userRouter
  .route("/user")
  .get(async (req, res) => {
    const { page=1, limit=10} = req.query
    const users = await userModel.find({}).limit(limit*1).skip(((page-1)));
    res.json(users)
    
  })
  .post(async (req, res) => {
    const { name, email } = req.body;
    // adding these fields to the database
    const user = await userModel.create({
      ...req.body
    });
    const result = await user.save();
    res.send(result);
  });

module.exports = userRouter;
