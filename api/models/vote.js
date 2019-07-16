// Dependencies
const mongoose = require('mongoose')

// App Script
const vote = mongoose.Schema({
   _id: mongoose.Schema.Types.ObjectId,
   title: {type: String, required: true},
   description: {type: String, required: false},
   creator: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
   lists: [{
     _id: mongoose.Schema.Types.ObjectId,
     title: {type: String, required: true},
     description: {type: String, required: false}
   }],
   voters: [{
    voter: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
    chosenList: mongoose.Schema.Types.ObjectId
   }]
})

// Export
module.exports = mongoose.model('Vote', vote)
