const Job = require('../model/jobModel')

exports.addJob = async(req,res)=>{
    let jobToAdd = new Job({
        job_title: req.body.job_title,
        posted_date: req.body.posted_date,
        expiry_date: req.body.expiry_date,
        job_location: req.body.job_location,
        job_description: req.body.job_description,
        company_name:req.body.company_name

    })
    jobToAdd =await jobToAdd.save()
    if(!jobToAdd){
        return res.status(400).json({error:"Unable to add job"})

    }
    res.send(jobToAdd)
}

