const express = require('express')
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
  await ServiceAuth.getUserAuth(req, res, true)
})

// Module Export
module.exports = router