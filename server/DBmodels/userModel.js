const mongoose = require('mongoose')
const Schema = mongoose.Schema

const User = new Schema({
  hashPassword: {type: String, required: true},
  firstName: {type: String, required: true},
  secondName: {type: String, required: true},
  createdDate: {type: Date, default: () => new Date()},
  birthday: {type: Date, required: false},
  email: {type: String, required: true},
  isEmployee: {type: Boolean, required: true}
})

User.set('toJSON', {virtuals: true})

module.exports = mongoose.model('User', User)
