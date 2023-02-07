const express = require("express");
const jwt = require("jsonwebtoken");
const router = express.Router();
require("dotenv").config();
const User = require("../models/User");

router.get("", (req, res) => {
  let token = req.headers.token;
  jwt.verify(token, process.env.SECRET_KEY, (err, decoded) => {
    if (err)
      return res.status(401).json({
        title: "unauthorised",
      });

    User.findOne({ _id: decoded.userId }, (err, user) => {
      if (err) console.log(err);
      return res.status(200).json({
        title: "success",
        user: {
          username: user.username,
        },
      });
    });
  });
});

module.exports = router;
