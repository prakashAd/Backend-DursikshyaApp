const mongoose = require('mongoose')

const alumniSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  phoneNumber:{
    type: String,
    required: ture
  },
  age:{
    type: Number,
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