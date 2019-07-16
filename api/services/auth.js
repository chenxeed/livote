// Dependencies
const jwt = require('jsonwebtoken')
const ModelUser = require('../models/user')
const config = require('../config')

// Scripts
function signJWT(id, expiresIn = '2h') {
  const token = jwt.sign({ id }, config.SECRET_TOKEN, {
    expiresIn
  })
  return token
}

async function verifyRequestAuth(req) {
  return new Promise((resolve, reject) => {
    let token = req.headers['x-access-token'] || req.headers['authorization']
    if (!token) {
      reject(new Error('token not found'))
    } else {
      if (token.startsWith('Bearer ')) {
        // Remove Bearer from string
        token = token.slice(7, token.length)
      }
      jwt.verify(token, config.SECRET_TOKEN, (error, payload) => {
        if (error) {
          reject(error)
        } else {
          resolve(payload.id)
        }
      })
    }
  })
}

async function mustNotLogin(req, res, next) {
  try {
    const id = await verifyRequestAuth(req)
    const user = ModelUser.findById(id)
    if (user) {
      return res.status(403).json({
        error: 'user already login'
      })
    } else {
      next()
    }
  } catch (error) {
    next()
  }
}

function getUserAuth(mustLogin = false) {
  return async (req, res, next) => {
    try {
      const id = await verifyRequestAuth(req)
      const user = ModelUser.findById(id)
      if (mustLogin && !user) {
        return res.status(403).json({
          error: 'user must login'
        })
      } else {
        req.user = user
        next()
      }
    } catch (error) {
      if (mustLogin) {
        return res.status(403).json({
          error: 'user must login'
        })
      }
    }
  }
}

// Export
module.exports = {
  signJWT,
  verifyRequestAuth,
  getUserAuth,
  mustNotLogin
}
