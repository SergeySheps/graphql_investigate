import api from '../api/api'
import {routs} from '../constants/constants'

export const pizzaService = {
  getProductsFromDB
}

function getProductsFromDB(queryString) {
  return window.location.pathname === '/'
    ? api.getRequestWithoutToken(routs.preview + (queryString ? queryString : ''))
    : api.getRequestWithToken(routs.main + (queryString ? queryString : ''))
}
