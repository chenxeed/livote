const express = require('express')
const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')
const ModelUser = require('../models/user')
const ServiceAuth = require('../services/auth')

// Configuration Variable
const router = express.Router()

// App Script
router.post('/signup', ServiceAuth.mustNotLogin, async (req, res) => {
  bcrypt.hash(req.body.password, 10, async (error, hash) => {
    // error if hashing password failed
    if(error) {
      return res.status(500).json({
        error
      })
    } else {
      // ensure user email is not exist yet
      const checkUser = await ModelUser.findOne({ email: req.body.email }).exec()
      if (checkUser) {
        return res.status(409).json({
          error: 'email already exist'
        })  
      }
      // once we ensure email is not exist, start creating!
      const user = new ModelUser({
        _id: new mongoose.Types.ObjectId(),
        email: req.body.email,
        password: hash    
      })
      try {
        await user.save()
        return res.status(200).json({
          success: 'New user has been created'
        })
      } catch (error) {
        return res.status(500).json({
            error
        })
      }
    }
   })
})

router.post('/signin', ServiceAuth.mustNotLogin, async (req, res) => {
  try {
    const user = await ModelUser.findOne({ email: req.body.email }).exec()
    bcrypt.compare(req.body.password, user.password, (error, result) => {
      if (error || !result) {
        return res.status(401).json({
          failed: 'Authentication failed'
        })
      } else {
        const token = ServiceAuth.signJWT(user._id)
        return res.status(200).json({
          success: 'Authentication success',
          token
        })
      }
    })
  } catch (error) {
    return res.status(401).json({
      failed: 'Authentication failed'
    })
  }
})

router.get('/verify-auth', ServiceAuth.getUserAuth(false), async (req, res) => {
  const user = req.user
  console.log('mana user', user)
  if (user) {
    return res.status(200).json({
      success: 'Authentication verified',
      user: {
        email: user.email
      }
    })
  } else {
    return res.status(401).json({
      failed: 'Authentication failed'
    })
  }
})

// Module Export
module.exports = router