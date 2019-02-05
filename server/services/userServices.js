const config = require('../config.json')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const db = require('../helpers/dbHelpers')
const {saltRounds} = require('../constants/constants')
const User = db.User
const Order = db.Order

async function createAccount(userParam) {
  const user = new User(userParam)

  if (userParam.password) {
    user.hashPassword = bcrypt.hashSync(userParam.password, saltRounds)
  }

  return await user.save()
}

async function checkEqualEmail(userParam) {
  return (await User.findOne({email: userParam.email})) ? {equal: true} : {equal: false}
}

async function login({email, password}) {
  const user = await User.findOne({email})

  if (user && bcrypt.compareSync(password, user.hashPassword)) {
    const {hashPassword, ...userData} = user.toObject()
    const token = jwt.sign({sub: user.id}, config.secretWord)

    return {
      ...userData,
      token
    }
  }
}

async function saveOrderData(orderData) {
  const order = new Order(orderData)

  return await order.save()
}

async function getOrdersHistory({email}) {
  return await Order.find({email})
}

module.exports = {
  createAccount,
  login,
  checkEqualEmail,
  saveOrderData,
  getOrdersHistory
}
