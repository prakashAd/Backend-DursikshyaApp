const express = require ('express')
const{register, verifyEmail, resendVerification, forgetPassword, resetPassword, getUserList, updateUser, userDetails, signIn, signOut} = require('../controller/userController')

const router = express.Router()
router.post('/register',register)
router.get('/verifyemail/:token',verifyEmail)
router.post('/resendverification',resendVerification)
router.post('/forgetpassword',forgetPassword)
router.post('/resetpassword/:token',resetPassword)
router.get('/getuserlist',getUserList)
router.post('/updateuser',updateUser)
router.get('/userdetails',userDetails)
router.post('/signin',signIn)
router.get('/signout',signOut)
module.exports = router