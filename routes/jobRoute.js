const express = require('express')

const {addJob} =require('../controller/job Controller')
const router = express.Router()

router.post('/addjob',addJob)

module.exports = router