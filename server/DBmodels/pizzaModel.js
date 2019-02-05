const mongoose = require('mongoose')
const mongoosePaginate = require('mongoose-paginate')
const Schema = mongoose.Schema

const Pizza = new Schema({
  name: {type: String, required: true},
  class: {type: String, required: true},
  image_url: {type: String, required: true},
  composition: {type: String, required: true}
})

Pizza.set('toJSON', {virtuals: true})
Pizza.plugin(mongoosePaginate)

module.exports = mongoose.model('Pizza', Pizza)
