const Job = require('../model/jobModel')


//to create new job
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


//get all jobs

exports.getAllJobs = async (req,res)=>{
    let jobs  = await Job.find()
    if(!jobs){
        return res.status(400).json
({error:"something went wrong"})

    }
    res.send(jobs)
}


//to get job details
exports.jobDetails = async (req,res)=>{

    let job = await Job.findById(req.params.id)

    if(!job){
        return res.status(400).json({error:"Cannot find details about desired job"})
    }
    res.send(job)
}
//to update job

exports.updateJob = async (req,res)=>{

    let jobToUpdate = await Job.findByIdAndUpdate(req.params.id,{

        job_title:req.body.job_title,
        job_description:req.body_description,
        job_location:req.body_location
    },{new:true} )

    if(!jobToUpdate){
        return res.status(400).json({error:"Something went wrong"})
    }
    res.send(jobToUpdate)
}


