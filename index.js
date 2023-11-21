const express = require('express');
const app = express();
const mongoose = require("./Model/userModel")
const userRoute = require("./userRoute")
app.use(express.json());
app.use(express.urlencoded({ extended: true}))

app.use('/user', userRoute);

app.listen(3000, ()=>{
    console.log("server running at http:localhost:3000/");
})