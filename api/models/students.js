const mongoose = require('mongoose');

const  studentSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  firstname: {type: String,required:true},
  lastname: {type: String,required:true},
  email: {type: String, required:true},
  rollno: {type: Number,required:true},
  studentimage:{type: String,required:true},
  school:{type: String, required:true},
  title:{type: String, required:true},
  contact:{type: String, required:true},
}, 
{versionKey: false}
)

module.exports = mongoose.model('Student', studentSchema)