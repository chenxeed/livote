// Dependencies
const jwt = require('jsonwebtoken')
const config = require('../config')

// Scripts
function signJWT(id, expiresIn = '2h') {
  const token = jwt.sign({ id }, config.SECRET_TOKEN, {
    expiresIn
  })
  return token
}

function verifyAuth(token, mustLogin = false) {
  const verifyToken = jwt.verify(token, config.SECRET_TOKEN, (error, payload) => {
    if (payload) {

    }
  })
}

// Export
module.exports = {
  signJWT,
  verifyAuth
}