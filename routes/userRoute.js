const express = require ('express')
const{register} = require('../controller/userController')

const router = express.Router()
router.post('/register',register)

module.exports = router