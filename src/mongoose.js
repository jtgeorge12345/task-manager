const mongoose = require('mongoose');
const validator = require('validator');

mongoose.connect('mongodb://127.0.0.1:27017/task-manager-api', {
  useNewUrlParser: true,
  useCreateIndex: true
});

const User = mongoose.model("User", {
  name: {
    type: String
  },
  age: {
    type: Number
  },
  email: {
    type: String,
    required: true,
    validate(value) {
      if(!validator.isEmail(value)) {
        throw new Error("Email Invalid");
      }
    }
  },
  password: {
    type:String,
    required:true,
    trim:true,
    validate(value) {
      if(value.length < 7) {throw new Error("Password is less than 7 characters")}
      if(value.toLowerCase().includes("password")) {throw new Error("Password cannot contain 'password'.")}
    }
  }
});

const me = new User({
  name:"tim",
  age:24,
  email: "asdf@abc.com",
  password: "Beowulf"

});

//
// me.save().then((response) => {
//   console.log("success!", JSON.stringify(response, undefined, 2));
// }).catch((error) => {
//   console.log("Error!", JSON.stringify(error, undefined, 2));
// })

const Task = mongoose.model("Task", {
  description: {
    type: String,
    required: true,
    trim: true
  },
  complete: {
    type: Boolean,
    default: false
  }
});

const myTask = new Task({
  description: " play video games    ",
});

myTask.save().then((result) => console.log("success", result)).catch((e) => console.log("error", e));
