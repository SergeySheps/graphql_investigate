const db = require('../helpers/dbHelpers')
const {perPageLimit} = require('../constants/constants')
const Ingredients = db.Ingredients
const Pizza = db.Pizza

async function getProducts(numPage) {
  return numPage
    ? await Pizza.paginate({}, {page: +numPage, limit: perPageLimit, lean: true})
    : await Ingredients.find({})
}

async function getPizzaProducts(numPage) {
  try {
    return await Pizza.paginate({}, {page: numPage, limit: perPageLimit, lean: true})
  } catch (error) {
    return {errorMessage: error.message}
  }
}

module.exports = {
  getProducts,
  getPizzaProducts
}
