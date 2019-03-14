const express = require("express");
const userRouter = require('./routers/user.js');
const taskRouter = require('./routers/task.js');
require('./db/mongoose');

// app.use((req, res, next) => {
//   res.status(503).send("App temporarily offline")
// })

const app = express();
const port = process.env.PORT;
//
// const multer = require('multer')
// const upload = multer({
//   dest:'images'
// })
//
// app.post('/upload', upload.single('upload'), (req, res) => {
//   res.send()
// })



app.use(express.json());
app.use(userRouter);
app.use(taskRouter);





app.listen(port, () => {
  console.log('server is up on port:', port);
});

const Task = require('./models/task')
const User = require('./models/user')

const main = async ()=> {
  // const task = await Task.findById('5c848e801f02390b33bddce0')
  // await task.populate('owner').execPopulate()
  // console.log(task.owner)

  // const user = await User.findById('5c848df141fc740b1c392ffb')
  // await user.populate('tasks').execPopulate()
  // console.log(user.tasks)
}

//
