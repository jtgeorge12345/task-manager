const express = require('express');
const router = new express.Router();
const Task = require('../models/task.js');

router.post('/tasks', async (req, res) => {

  const task = new Task(req.body);
  try {
    await task.save();
    res.status(201).send(task);
  } catch (e) {
    res.status(400).send(e);
  }
});

router.get('/tasks', async (req, res) => {
  try {
    const tasks = await Task.find();
    res.send(tasks);
  } catch (e) {
    res.status(500).send(e);
  }
});

router.get('/tasks/:id', async (req, res) => {
  const _id = req.params.id;
  try{
    const task = await Task.findById(_id);

    if(!task) {
      res.status(404).send();
    }

    res.send(task);
  } catch (e) {
    res.status(500).send(e);
  }
});

router.patch('/tasks/:id', async (req, res) => {

  const taskID = req.params.id;
  const updates = Object.keys(req.body);
  const allowedUpdates = ['description', 'complete'];

  const isValidOperation = updates.every((update) => allowedUpdates.includes(update))

  if (!isValidOperation) {
    res.status(400).send({error:"That attribute cannot be updated"});
  }

  try {

    const task = await Task.findById(taskID);
    updates.forEach((update) => task[update] = req.body[update])
    await task.save();

    //const task = await Task.findByIdAndUpdate(taskID, req.body,   {new: true, runValidators:true} );

    if (!task) {
      res.status(404).send({error: 'Could not find the specified task'});
    }

    res.send(task);
  } catch (e) {
    res.status(500).send(e.message);
  }
})

router.delete('/tasks/:id', async (req, res) => {
  console.log("Delete Task called")

  try {
    const task = await Task.findByIdAndDelete(req.params.id);

    if (!task) {
      return res.status(404).send({error:"Could not find task to delete"});
    }
    res.send(task);
  } catch (e) {
    res.status(500).send("test text");
  }
})

module.exports = router;
