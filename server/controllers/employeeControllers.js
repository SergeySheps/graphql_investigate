const {statusCodes} = require('../constants/constants')
const employeeServices = require('../services/employeeServices')

function getOrdersQueue(req, res) {
  employeeServices.getOrdersQueue().then(
    queue => {
      queue
        ? res.json(queue)
        : res.status(statusCodes.BadRequest).json({})
    },
    error => {
      res.status(statusCodes.InternalServerError).json({message: error.message})
    }
  )
}

function saveOrderAcceptor(req, res) {
  employeeServices.saveOrderAcceptor(req.body).then(
    resolve => {
      res.json(resolve)
    },
    error => {
      res.status(statusCodes.InternalServerError).json({message: error.message})
    }
  )
}

function deleteOrderFromQueue(req, res) {
  employeeServices.deleteOrderFromQueue(req.body).then(
    resolve => {
      res.json(resolve)
    },
    error => {
      res.status(statusCodes.InternalServerError).json({message: error.message})
    }
  )
}

function postCookRequests(req, res) {
  switch (true) { 
    case !!req.query.isSaveReadyOrder: {
      saveReadyOrder(req, res)
      break
    }
    case !!req.query.isSaveStartWorkTime: {
      saveStartTime(req, res)
      break
    }
    case !!req.query.isGetStartWorkTime: {
      getStartTime(req, res)
      break
    }
    case !!req.query.isGetDayReport: {
      getDayReport(req, res)
      break
    }
    default:
      getOrdersInProgress(req, res)
  }
}

function putCookRequests(req, res) {
  switch (true) {
    case !!req.query.isSaveFinishWorkTime: {
      saveFinishTime(req, res)
      break
    }
    default:
      saveOrderAcceptor(req, res)
  }
}

function getOrdersInProgress(req, res) {
  employeeServices.getOrdersInProgress(req.body).then(
    orders => {
      orders ? res.json(orders) : res.status(statusCodes.BadRequest).json({})
    },
    error => {
      res.status(statusCodes.InternalServerError).json({message: error.message})
    }
  )
}

function getDayReport(req, res) {
  employeeServices.getDayReport(req.body).then(
    orders => {
      orders ? res.json(orders) : res.status(statusCodes.BadRequest).json({})
    },
    error => {
      res.status(statusCodes.InternalServerError).json({message: error.message})
    }
  )
}

function saveReadyOrder(req, res) {
  employeeServices.saveReadyOrder(req.body).then(
    resolve => {
      res.json(resolve)
    },
    error => {
      res.status(statusCodes.InternalServerError).json({message: error.message})
    }
  )
}

function saveStartTime(req, res) {
  employeeServices.saveStartTime(req.body).then(
    resolve => {
      res.json(resolve)
    },
    error => {
      res.status(statusCodes.InternalServerError).json({message: error.message})
    }
  )
}

function saveFinishTime(req, res) {
  employeeServices.saveFinishTime(req.body).then(
    resolve => {
      res.json(resolve)
    },
    error => {
      res.status(statusCodes.InternalServerError).json({message: error.message})
    }
  )
}

function getStartTime(req, res) {
  employeeServices.getStartTime(req.body).then(
    time => {
      time
        ? res.json(time)
        : res.json({})
    },
    error => {
      res.status(statusCodes.InternalServerError).json({message: error.message})
    }
  )
}

function getCookedOrdersHistory(req, res) {
  employeeServices.getCookedOrdersHistory(req.body).then(
    history => {
      history
        ? res.json(history)
        : res.status(statusCodes.BadRequest).json({})
    },
    error => {
      res.status(statusCodes.InternalServerError).json({message: error.message})
    }
  )
}

module.exports = {
  getOrdersQueue,
  putCookRequests,
  postCookRequests,
  deleteOrderFromQueue,
  getCookedOrdersHistory
}
