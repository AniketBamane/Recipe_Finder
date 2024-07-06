const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require("jsonwebtoken")

const userSchema = mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
})

userSchema.pre("save",async function (next) {
  const user = this
  if(!user.isModified("password")){
     return next();
  }
  try{
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(user.password, salt);
    next();
  }catch(err){
    next(err);
  }
})

userSchema.methods.comparePassword = async function(password){
  return await bcrypt.compare(password, this.password);
}

userSchema.methods.generateToken = function(){
  return  jwt.sign({
    id: this._id,
    username: this.username,
  },process.env.JWT_SECRET_KEY)
}


const User =mongoose.models.users || mongoose.model('User', userSchema);

module.exports = User;