const mongoose = require('mongoose');
const Schema= mongoose.Schema;

//this js file creates the format of the User collection so we can later create a user with information, which then allows us to search the collection,
//update it and delete it
const userSchema = new Schema({
  title: String, 
  fname: String,
  surname: String,
  mobile: String,
  email: String
});

const User =  mongoose.model('User', userSchema);
module.exports = User;