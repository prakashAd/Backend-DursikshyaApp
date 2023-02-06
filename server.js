const express = require('express')
require('dotenv').config()
require('./database/connection')

//middleware call
const bodyParser = require('body-parser')
const cors = require('cors')

// routes
const JobRoute = require('./routes/jobRoute')
const UserRoute = require('./routes/userRoute')
const AlumniRoute = require('./routes/alumniRoute')

const app = express()
const port = process.env.PORT || 8000

//middleware use
app.use(bodyParser.json())
app.use(cors())

//use routes
app.use('/api',JobRoute)
app.use('/api',UserRoute)
app.use('/api',AlumniRoute)


app.listen(port,()=>{
    console.log(`Server started successfully at port ${port}`)

})