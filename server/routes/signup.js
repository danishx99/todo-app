const express = require("express");
const router = express.Router();
const User = require("../models/User");
const bcrypt = require("bcrypt")

router.post("/", (req, res) => {
  const newUser = new User({
    username: req.body.username,
    password: bcrypt.hashSync(req.body.password, 10)
  });

  newUser.save(err => {
    if (err) {
        return res.status(400).json({
            title: "error",
            error: "Email already in use"
        })
    }
    return res.status(200).json({
        title: "User sucessfully added"
    })
  })
});

module.exports = router