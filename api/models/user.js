// Dependencies
const mongoose = require('mongoose')

// App Script
const user = mongoose.Schema({
   _id: mongoose.Schema.Types.ObjectId,
   email: {type: String, required: true},
   password: {type: String, required: true}
})

// Export
module.exports = mongoose.model('User', user)
