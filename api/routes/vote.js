const express = require('express')
const mongoose = require('mongoose')
const ModelVote = require('../models/vote')
const ServiceAuth = require('../services/auth')

// Configuration Variable
const router = express.Router()

// App Script

// Read
router.get('/all', ServiceAuth.getUserAuth(true), async (req, res) => {
  const votes = await ModelVote.find({}).exec()
  return res.status(200).json({
    votes
  })
})

// Create
router.post('/create', ServiceAuth.getUserAuth(true), async (req, res) => {
  const user = req.user
  try {
    const vote = new ModelVote({
      _id: new mongoose.Types.ObjectId(),
      title: req.body.title,
      description: req.body.description,
      creator: user._id,
      lists: req.body.lists.map(list => ({
        id: new mongoose.Types.ObjectId(),
        title: list.title,
        description: list.description
      }))
    })
    const newVote = await vote.save()
    return res.status(200).json({
      success: 'New vote has been created',
      vote: newVote
    })
  } catch (e) {
    return res.status(500).json({
      error: 'failed to create new vote'
    })
  }
})

// Module Export
module.exports = router