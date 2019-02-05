const mongoose = require('mongoose')
const config = require('../config.json')
const userModel = require('../DBmodels/userModel')
const ingredientModel = require('../DBmodels/ingredientModel')
const pizzaModel = require('../DBmodels/pizzaModel')
const orderModel = require('../DBmodels/orderModel')
const timeJournalModel = require('../DBmodels/timeJournalModel')
const readyOrderModel = require('../DBmodels/readyOrderModel')

mongoose.Promise = global.Promise

mongoose.connect(
  config.connectionDBString,
  {
    useNewUrlParser: true,
    reconnectTries: 10
  }
)

module.exports = {
  User: userModel,
  Ingredients: ingredientModel,
  Pizza: pizzaModel,
  Order: orderModel,
  ReadyOrder: readyOrderModel,
  TimeJournal: timeJournalModel
}
