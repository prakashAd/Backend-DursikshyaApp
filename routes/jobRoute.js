const express = require('express')

const {addJob, getAllJobs, jobDetails, updateJob} =require('../controller/job Controller')
const { requireSignin } = require('../controller/userController')
const router = express.Router()

router.post('/addjob',requireSignin,addJob)
router.get('/getalljobs',getAllJobs)
router.get('/jobdetails/:id',jobDetails)
router.put('/updatejob/:id',updateJob)

module.exports = router