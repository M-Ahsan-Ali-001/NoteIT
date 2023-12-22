const mongoose = require('mongoose')

var User_notes = mongoose.model('noteit_notes',{
_id:{type:String},
email:{type:String },
tag : {type :String },
data: {type :String }


})

module.exports = {User_notes}