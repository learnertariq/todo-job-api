const router = require("express").Router();
const mongoose = require("mongoose");
const auth = require("../middlewares/auth");
const { Task } = require("../models/task");

router.get("/", auth, async (req, res) => {
  const queryObj = { email: req.user?.email };

  const tasks = await Task.find(queryObj);
  res.send(tasks);
});

router.post("/", auth, async (req, res) => {
  const bodyCopy = req.body;
  console.log(req.user);

  const task = new Task({
    name: bodyCopy.name,
    email: req.user?.email,
    desc: bodyCopy.desc,
    complete: bodyCopy.complete || false,
  });

  await task.save();
  res.send(task);
});

router.patch("/:id", auth, async (req, res) => {
  const id = req.params.id;
  const task = await Task.findByIdAndUpdate(
    mongoose.Types.ObjectId(id),
    req.body
  );
  res.send(task);
});

router.delete("/:id", auth, async (req, res) => {
  const id = req.params.id;
  const task = await Task.findByIdAndDelete(mongoose.Types.ObjectId(id));
  res.send(task);
});

module.exports = router;
