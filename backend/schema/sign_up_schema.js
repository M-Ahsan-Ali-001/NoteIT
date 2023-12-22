const mongoose = require('mongoose')

var User_signup = mongoose.model('noteit_signup',{
email:{type:String,unique:true},
password : {type :String },


})

module.exports = {User_signup}