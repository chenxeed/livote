// Dependencies
const express = require('express')
const cors = require('cors')
const app = express()
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const routeUser = require('./routes/user')
const routeVote = require('./routes/vote')
const config = require('./config')

// Variables
const clientUrl = config.CLIENT_HOST +
(config.CLIENT_PORT ? `:${config.CLIENT_PORT}` : '')

// Setup
mongoose.connect(`mongodb://${config.DB_HOST}/${config.DB_NAME}`, { useNewUrlParser: true })

// App Script
app.use(cors({
  origin: clientUrl
}))
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.use('/user', routeUser)
app.use('/vote', routeVote)

app.listen(config.SERVER_PORT, function(){
  console.log('Server is running on Port', config.SERVER_PORT)
})
