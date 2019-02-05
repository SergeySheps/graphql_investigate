const jwt = require('jsonwebtoken')
const config = require('../config.json')
const {typeOfNull} = require('../constants/constants')

function verifyToken(req) {
  const token = req.headers['x-access-token']

  if (token === typeOfNull) {
    throw new Error('No token provided.')
  }

  jwt.verify(token, config.secretWord, function(err, decoded) {
    if (err) {
      throw new Error('Failed to authenticate token.')
    }

    req.userId = decoded.id
  })
}

module.exports = verifyToken
