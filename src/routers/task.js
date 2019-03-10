const express = require('express');
const router = new express.Router();
const Task = require('../models/task.js');
const auth = require('../middleware/auth')

router.post('/tasks', auth, async (req, res) => {

  //const task = new Task(req.body);
  const task = new Task({
    ...req.body,
    owner: req.user._id
  })

  try {
    await task.save();
    res.status(201).send(task);
  } catch (e) {
    res.status(400).send(e);
  }
});

//GET /tasks?complete=true
//GET /tasks?limit=10&skip=10
//GET /tasks?sortBy=createdAt_asc
router.get('/tasks', auth, async (req, res) => {
    const match = {}
    const sort = {}
    if (req.query.complete) {
      match.complete = req.query.complete === 'true'
    }

    if(req.query.sortBy) {
      const parts = req.query.sortBy.split("_")
      sort[parts[0]] = parts[1] === 'desc' ? -1 : 1
    }
  try {
    const tasks = await req.user.populate({
      path:'tasks',
      match,
      options: {
        limit: parseInt(req.query.limit),
        skip:parseInt(req.query.skip),
        sort
      }
    }).execPopulate()
    res.send(req.user.tasks);
  } catch (e) {
    res.status(500).send(e);
  }
});

router.get('/tasks/:id', auth, async (req, res) => {
  const _id = req.params.id;
  try{
    const task = await Task.findOne({_id, owner: req.user._id})

    if(!task) {
      res.status(404).send();
    }

    res.send(task);
  } catch (e) {
    res.status(500).send(e);
  }
});

router.patch('/tasks/:id', auth, async (req, res) => {

  const taskID = req.params.id;
  const updates = Object.keys(req.body);
  const allowedUpdates = ['description', 'complete'];

  const isValidOperation = updates.every((update) => allowedUpdates.includes(update))

  if (!isValidOperation) {
    res.status(400).send({error:"That attribute cannot be updated"});
  }

  try {

    const task = await Task.findOne({_id:taskID, owner: req.user._id});

    //const task = await Task.findByIdAndUpdate(taskID, req.body,   {new: true, runValidators:true} );

    if (!task) {
      res.status(404).send({error: 'Could not find the specified task'});
    }

    updates.forEach((update) => task[update] = req.body[update])
    await task.save();

    res.send(task);
  } catch (e) {
    res.status(500).send(e.message);
  }
})

router.delete('/tasks/:id', auth, async (req, res) => {
  try {
    const task = await Task.findOneAndDelete({_id:req.params.id, owner:req.user._id});

    if (!task) {
      return res.status(404).send({error:"Could not find task to delete"});
    }
    res.send(task);
  } catch (e) {
    res.status(500).send("test text");
  }
})

module.exports = router;
