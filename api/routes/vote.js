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
  return res.status(200).json(votes)
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
        _id: new mongoose.Types.ObjectId(),
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

// Delete
router.delete('/delete', ServiceAuth.getUserAuth(true), async (req, res) => {
  const id = req.body.id
  try {
    const vote = await ModelVote.findByIdAndDelete(id).exec()
    return res.status(200).json({
      success: `Vote ${id} has been deleted`,
      id,
      vote
    })
  } catch (e) {
    return res.status(500).json({
      error: 'failed to delete the vote ' + id
    })
  }
})

// Update
router.put('/update', ServiceAuth.getUserAuth(true), async(req, res) => {
  const body = req.body
  const id = body.id
  try {
    const vote = ModelVote.findById(id)
    if (body.title) {
      vote.title = body.title
    }
    if (body.description) {
      vote.description = body.description
    }
    await vote.save()
    return res.status(200).json({
      success: `Vote ${id} has been modified`,
      id,
      vote
    })
  } catch(e) {
    return res.status(500).json({
      error: 'failed to update the vote ' + id
    })
  }
})

// Module Export
module.exports = router