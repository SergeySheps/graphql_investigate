const jwt = require('jsonwebtoken')
const config = require('../config.json')
const {statusCodes, typeOfNull} = require('../constants/constants')

function verifyToken(req, res, next) {
  const token = req.headers['x-access-token']

  if (token === typeOfNull) {
    return res
      .status(statusCodes.Unauthorized)
      .send({auth: false, message: 'No token provided.'})
  }

  jwt.verify(token, config.secretWord, function(err, decoded) {
    if (err) {
      return res
        .status(statusCodes.InternalServerError)
        .send({auth: false, message: 'Failed to authenticate token.'})
    }

    req.userId = decoded.id
    next()
  })
}

module.exports = verifyToken
