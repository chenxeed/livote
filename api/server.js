// Dependencies
const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const routeUser = require('./routes/user')
const routeVote = require('./routes/vote')
const config = require('./config')

// Setup
mongoose.connect(`mongodb://${config.DB_HOST}/${config.DB_NAME}`, { useNewUrlParser: true })

// App Script
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.use('/user', routeUser)
app.use('/vote', routeVote)

app.listen(config.SERVER_PORT, function(){
  console.log('Server is running on Port', config.SERVER_PORT)
})
