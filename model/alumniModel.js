const mongoose = require('mongoose')

const alumniSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  location:{
    type:String,
    required:true
  },
  age:{
    type:String,
    required:true
  },
  phoneNumber:{
    type: String,
    required: ture
  },
  email:{
    type: String,
    required: true
  },
  yearGraduated: {
    type: String,
  },
  courseCompleted: {
    type: String,
  }

},{timestamps:true})

module.exports = mongoose.model("Alumni",alumniSchema)