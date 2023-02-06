const mongoose = require('mongoose')

const jobSchema = new mongoose.Schema({
    job_title : {
        type: String,
        required:true,
        trim: true
    },
    posted_date:{
        type: String,
        required: true
    },
    expiry_date:{
        type: String,
        required:true
    },
    job_location:{
        type :String,
        required: true
    },
    job_description:{
        type: String,
        required : true
    },
    company_name:{
        type: String,
        trim:true,
        required: true
    }

    
},{timestamps:true})

module.exports = mongoose.model("Job", jobSchema)