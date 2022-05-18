const router = require("express").Router();
const mongoose = require("mongoose");
const { Task } = require("../models/task");
// const auth = require("../middlewares/auth");

router.get("/", async (req, res) => {
  const queryObj = {};

  const tasks = await Task.find(queryObj);
  res.send(tasks);
});

// router.get("/secured", auth, async (req, res) => {
//   const tasks = await Task.find({ email: req.user.email });
//   res.send(tasks);
// });

// router.post("/", auth, async (req, res) => {
router.post("/", async (req, res) => {
  const bodyCopy = req.body;

  const task = new Task({
    name: bodyCopy.name,
    desc: bodyCopy.desc,
  });

  await task.save();
  res.send(task);
});

router.delete("/:id", async (req, res) => {
  const id = req.params.id;
  const task = await Task.findByIdAndDelete(mongoose.Types.ObjectId(id));
  res.send(task);
});

module.exports = router;
