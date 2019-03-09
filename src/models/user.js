const mongoose = require('mongoose');
const validator = require('validator');


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

module.exports = User;
