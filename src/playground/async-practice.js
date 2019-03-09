require('../db/mongoose.js');
const User = require('../models/user.js');
const Task = require('../models/task.js');

const updateAgeAndCount = async (id, age) => {
  const user = await User.findByIdAndUpdate(id, {age});
  const count = await User.countDocuments({age});
  return count;
}

// updateAgeAndCount( "5c7cbe8d68c48a01792d0bf2", 2).then((count) => {
//   console.log(count);
// }).catch( (e) => {
//   console.log(e);
// });


const deleteTaskAndCount = async (id) => {
  const deletedTask = await Task.findByIdAndDelete(id);
  console.log(deletedTask);
  const count = await Task.countDocuments();
  return(deletedTask, count);
}

deleteTaskAndCount('5c7f53cb0d68cd031312f890')
  .then((result) => console.log(result))
  .catch((e) => console.log(e));
