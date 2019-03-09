const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');
const userSchema = new mongoose.Schema({
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
})


//////////////////////Hashing Passwords////////////////////////
userSchema.pre('save', async function (next) {
  const user = this;

  if (user.isModified('password')) {
    user.password = await bcrypt.hash(user.password, 8)
  }

  next()
})

const User = mongoose.model("User", userSchema);

module.exports = User;
