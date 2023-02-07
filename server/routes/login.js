const express = require("express");
const router = express.Router();
const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config()

router.post("/", (req, res) => {
  User.findOne({ username: req.body.username }, (err, user) => {
    if (err)
      return res.status(500).json({
        title: "server error",
        error: err,
      });
    if (!user) {
      return res.status(400).json({
        title: "user is not found",
        error: "invalid username or password",
      });
    }
    if (!bcrypt.compareSync(req.body.password, user.password)) {
      return res.status(401).json({
        title: "login failed",
        error: "invalid username or password",
      });
    }

    // authentication is done, give them a token
    let token = jwt.sign({ userId: user._id }, process.env.SECRET_KEY);
    return res.status(200).json({
      title: "login successful",
      token: token,
    });
  });
});

module.exports = router;
