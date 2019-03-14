const mongoose = require('mongoose');

mongoose.connect(process.env.MONGODB_URL, {
  useNewUrlParser: true,
  useCreateIndex: true
});







// myTask.save().then((result) => console.log("success", result)).catch((e) => console.log("error", e));
