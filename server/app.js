const bodyParser = require("body-parser");
const express = require("express");
const cors = require("cors");
const app = express();
const jwt = require("jsonwebtoken")
const connect = require("./DB/dbConnect")
const mongoose = require('mongoose')
require("dotenv").config()
const signupRoute = require("./routes/signup")
const loginRoute = require("./routes/login")
//const userRoute = require("./routes/user")
const todosRoute = require("./routes/todo")

connect()

app.use(cors({ origin: true, credentials: true }));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use("/signup", signupRoute)
app.use("/login", loginRoute)
app.use("/todos", todosRoute)
//app.use("/user", userRoute)


const port = process.env.port || 5000;

mongoose.connection.once("open", () => {
  console.log("connected to database");
  app.listen(port, () => {
    console.log(`server listening on port ${port}`);
  });
});

mongoose.connection.on("error", (err) => {
  console.log(err);
});
