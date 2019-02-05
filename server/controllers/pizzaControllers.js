const {statusCodes} = require('../constants/constants')
const pizzaServices = require('../services/pizzaServices')

function getProducts(req, res) {
  const queryStringValues = req.query;
  
  pizzaServices.getProducts(queryStringValues.numPage).then(
    products => {
      products ? res.json(products) : res.status(statusCodes.BadRequest).json({message: error.message})
    },
    error => {
      res.status(statusCodes.InternalServerError).json({message: error.message})
    }
  )
}

module.exports = {
  getProducts
}
