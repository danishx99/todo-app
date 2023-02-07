const express = require("express");
const router = express.Router();
const Todo = require("../models/Todo");
const jwt = require("jsonwebtoken");
require("dotenv").config();

router.get("/", (req, res) => {
  jwt.verify(req.headers.token, process.env.SECRET_KEY, (err, decoded) => {
    if (err)
      return res.status(401).json({
        title: "not authorised",
        message: err.message,
      });

    Todo.find({ author: decoded.userId }, (err, todos) => {
      if (err) return console.log(err);
      return res.status(200).json({
        title: "success",
        todos: todos,
      });
    });
  });
});

router.post("/", (req, res) => {
  jwt.verify(req.headers.token, process.env.SECRET_KEY, (err, decoded) => {
    if (err)
      return res.status(401).json({
        title: "not authorised",
      });

    let newTodo = new Todo({
      title: req.body.title,
      author: decoded.userId,
    });

    newTodo.save((error) => {
      if (err) console.log(error);
      return res.status(200).json({
        title: "sucessfully added",
        todo: newTodo,
      });
    });
  });
});

router.put("/:todoId", (req, res) => {
  jwt.verify(req.headers.token, process.env.SECRET_KEY, (err, decoded) => {
    if (err)
      return res.status(401).json({
        title: "not authorised",
      });

    Todo.findOne({ author: decoded.userId, _id: req.params.todoId }, (err, todo) => {
      if (err) return console.log(err);

      todo.isCompleted = true;
      todo.save((error) => {
        if (error) return console.log(error);

        return res.status(200).json({
          title: "success",
          todo: todo,
        });
      });
    });
  });
});

module.exports = router;
