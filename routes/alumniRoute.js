const express = require('express')

const { getAllAlumnis, updateAlumni, alumniDetails, register, verifyEmail, forgetPassword, resendVerification, resetPassword, signIn, addAlumni} = require('../controller/alumniController')
const router = express.Router()

// router.post('/addalumni',addAlumni)
router.get('/getallalumnis',getAllAlumnis)
router.put('/updatealumni/:id',updateAlumni)
router.get('/alumniDetails/:id',alumniDetails)
router.post('/register',register)
router.get('/verifyemail/:token',verifyEmail)
router.post('/forgetpassword',forgetPassword)
router.post('/resendverification',resendVerification)
router.post('/forgetpassword',forgetPassword)
router.post('/resetpassword/:token',resetPassword)
router.post('/signin',signIn)







module.exports = router

