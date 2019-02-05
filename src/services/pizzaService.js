import api from '../api/api'

export const pizzaService = {
  getProductsFromDB,
  getPizzasFromDB
}

function getProductsFromDB() {
  return api.getGraphqlRequestWithoutToken(`?query={products{id,image,name,price,type}}`)
}

function getPizzasFromDB(numPage) {
  return api.getGraphqlRequestWithoutToken(
    `?query={pizzas(numPage:${numPage}){pages,docs{id,type,image,composition,name}}}`
  )
}
