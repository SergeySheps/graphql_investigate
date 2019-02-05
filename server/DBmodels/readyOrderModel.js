const mongoose = require('mongoose')
const Schema = mongoose.Schema

const readyOrder = new Schema({
  order: [
    {
      urlImage: {type: String, required: false},
      title: {type: String, required: true},
      price: {type: Number, required: true},
      size: {type: Number, required: true},
      amount: {type: Number, required: true},
      total: {type: Number, required: true},
      ingredients: [
        {
          name: {type: String, required: true},
          amount: {type: Number, required: true}
        }
      ]
    }
  ],
  cookEmail: {type: String, required: true},
  finishOrderDate: {type: Date, default: () => new Date()}
})

readyOrder.set('toJSON', {virtuals: true})

module.exports = mongoose.model('readyOrder', readyOrder)
