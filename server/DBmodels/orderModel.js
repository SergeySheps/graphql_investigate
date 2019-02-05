const mongoose = require('mongoose')
const Schema = mongoose.Schema

const Order = new Schema({
  userData: {
    street: {type: String, required: true},
    houseNumber: {type: Number, required: true},
    apartmentNumber: {type: Number, required: true},
    tel: {type: Number, required: true}
  },
  pizzaData: [
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
  email: {type: String, required: true},
  creationDate: {type: Date, default: () => new Date()},
  totalPrice: {type: Number, required: true},
  isCompleted: {type: Boolean, default: false},
  isInProgress: {type: Boolean, default: false},
  orderAcceptor: {type: String, default: ''}
})

Order.set('toJSON', {virtuals: true})

module.exports = mongoose.model('Order', Order)
