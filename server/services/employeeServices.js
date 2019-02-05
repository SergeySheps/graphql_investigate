const db = require('../helpers/dbHelpers')
const Order = db.Order
const ReadyOrder = db.ReadyOrder
const TimeJournal = db.TimeJournal

async function getOrdersQueue() {
  return await Order.find({ isCompleted: false })
}

async function getOrdersInProgress({ email }) {
  return await Order.find({
    orderAcceptor: email,
    isInProgress: true,
    isCompleted: false
  })
}

async function saveOrderAcceptor(orderData) {
  return await Order.findOneAndUpdate(
    { _id: orderData.id },
    { isInProgress: true, orderAcceptor: orderData.email }
  )
}

async function deleteOrderFromQueue(orderData) {
  return await Order.findOneAndUpdate(
    { _id: orderData.id },
    { isInProgress: false, isCompleted: true }
  )
}

async function saveReadyOrder(orderData) {
  const readyOrder = new ReadyOrder(orderData)

  return await readyOrder.save()
}

async function getCookedOrdersHistory({ email }) {
  return await ReadyOrder.find({ cookEmail: email })
}

async function saveStartTime(timeData) {
  const repeatingQuery = await TimeJournal.find({
    email: timeData.email,
    todaysDate: new Date(Date.now()).toLocaleDateString()
  })

  if (repeatingQuery.length > 0) {
    return null
  }

  const timeJournal = new TimeJournal(timeData)

  return await timeJournal.save()
}

async function saveFinishTime(timeData) {

  return await TimeJournal.findOneAndUpdate(
    {
      email: timeData.email,
      todaysDate: new Date(Date.now()).toLocaleDateString()
    },
    {
      finishTime: Date.now(),
      timeSinceStartWork: timeData.timeSinceStartWork
    },
    { new: true }
  )
}

async function getStartTime({ email }) {
  return await TimeJournal.findOne({
    email,
    todaysDate: new Date(Date.now()).toLocaleDateString()
  })
}

async function getDayReport({ email }) {
  const cookTimeData = await TimeJournal.findOne({
    email,
    todaysDate: new Date(Date.now()).toLocaleDateString()
  })

  return await ReadyOrder.find({
    cookEmail: email,
    finishOrderDate: {
      $gte: cookTimeData.startTime,
      $lte: cookTimeData.finishTime
    }
  })
}

module.exports = {
  getOrdersQueue,
  getOrdersInProgress,
  saveOrderAcceptor,
  saveReadyOrder,
  deleteOrderFromQueue,
  getCookedOrdersHistory,
  saveStartTime,
  saveFinishTime,
  getDayReport,
  getStartTime
}
