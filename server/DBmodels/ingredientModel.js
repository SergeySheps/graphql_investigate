const mongoose = require('mongoose')
const Schema = mongoose.Schema

const Ingredient = new Schema({
  name: {type: String, required: true},
  type: {type: String, required: true},
  price: {type: Number, required: true},
  image: {type: String, required: true}
})

Ingredient.set('toJSON', {virtuals: true})

module.exports = mongoose.model('Ingredients', Ingredient)
