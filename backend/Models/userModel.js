const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true }, // Unique username not allowed to be the same
  password: { type: String, required: true },
  email:    { type: String, required: true, unique: true }, // Unique email not allowed to be the same
  curruntToken: { type: String, default: '' } // Token for user session
});

const User = mongoose.model('User', userSchema);
module.exports = User;
