const express = require('express')

const { addAlumni, getAllAlumnis, updateAlumni} = require('../controller/alumniController.js')
const router = express.Router()

router.post('/addalumni',addAlumni)
router.get('/getallalumnis',getAllAlumnis)
router.put('/updatealumni/:id',updateAlumni)


module.exports = router

