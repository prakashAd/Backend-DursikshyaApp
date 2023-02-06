const Alumni = require('../model/alumniModel')


//to add new Alumni
exports.addAlumni =  async(req,res) =>{
    
    let alumniToAdd = new Alumni ({
        name: req.body.name,
        yearGraduated: req.body.yearGraduated,
        courseCompleted: req.body.courseCompleted

    })
    alumniToAdd = await alumniToAdd.save()

    if(!alumniToAdd){

    
    return res.status(400).json({error:"Failed to add Alumni"})
}
    res.send(alumniToAdd)
}


    // alumniToAdd = await  alumniToAdd.save()
    // .then(alumniToAdd =>{
    //     res.json(alumniToAdd)
    // })
    // .catch(err =>{
    //     res.status(400).json({error:err.message})
    // })


//Get all alumni

exports.getAllAlumnis = async(req,res) =>{
    let alumnis = await Alumni.find()
    if(!alumnis){
        return res.status(400).json({error:"Something went wrong"})

    }
    res.send(alumnis)
}


//To update Alumni

exports.updateAlumni = async (req,res) =>{
    let alumniToUpdate= await Alumni.findByIdAndUpdate(req.body.params.id,{
        alumni_name:req.body.alumni_name
    },{new:true})
    
    if(!alumniToUpdate){
        return res.status(400).json({error:"Unable to update desired Alumni"})
    }
    res.send(alumniToUpdate)
}