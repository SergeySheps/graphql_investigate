const {statusCodes} = require('../constants/constants')
const userServices = require('../services/userServices')

function register(req, res) {
  if (req.query.isEqual) {
    userServices.checkEqualEmail(req.body).then(
      resolve => {
        res.json(resolve)
      },
      error => {
        res.status(statusCodes.InternalServerError).json({message: error.message})
      }
    )
  } else {
    userServices.createAccount(req.body).then(
      user => {
        res.json({})
      },
      error => {
        res.status(statusCodes.InternalServerError).json({message: error.message})
      }
    )
  }
}

async function login(req, res) {
  try {
    const user = await userServices.login(req.body)
    user
      ? res.json(user)
      : res.status(statusCodes.BadRequest).json({message: 'Incorrect Email or password'})
  } catch (err) {
    res.status(statusCodes.InternalServerError).json({message: error.message})
  }
}

function saveOrderData(req, res) {
  userServices.saveOrderData(req.body).then(
    order => {
      res.json({})
    },
    error => {
      res.status(statusCodes.InternalServerError).json({message: error.message})
    }
  )
}

function getOrdersHistory(req, res) {
  userServices.getOrdersHistory(req.body).then(
    history => {
      history
        ? res.json(history)
        : res.status(statusCodes.BadRequest).json({message: error.message})
    },
    error => {
      res.status(statusCodes.InternalServerError).json({message: error.message})
    }
  )
}

module.exports = {
  register,
  login,
  saveOrderData,
  getOrdersHistory
}
