import {pizzaTypes, userTypes} from '../actions/types'
import {
  basePizzaPrice,
  coefficientPrice,
  pizzaIndexeSizes,
  pizzaSizes
} from '../constants/constants'

export function pizza(state = [], action) {
  switch (action.type) {
    case pizzaTypes.PIZZA_GET_PRODUCTS_SUCCESS:
      return {
        basePizzaPrice: basePizzaPrice[pizzaSizes.small],
        products: action.products.map(product => {
          return {
            ...product,
            price: product.price - coefficientPrice
          }
        })
      }
    case pizzaTypes.PIZZA_GET_PIZZAS_SUCCESS:
      return {
        pages: action.products.pages,
        pizzas: action.products.docs,
        hasStopLoadingPizzas: true
      }
    case pizzaTypes.PIZZA_GET_PRODUCTS_FAILURE:
      return {
        hasGetProductsFailed: true
      }
    case pizzaTypes.PIZZA_CREATE_PRICE_FROM_SIZE:
      return {
        basePizzaPrice: basePizzaPrice[pizzaIndexeSizes[action.nextIndexSize]],
        products: action.products
      }
    case pizzaTypes.PIZZA_CHANGE_PAGINATION_PAGE:
      return {
        hasStopLoadingPizzas: false,
        pizzas: [],
        pages: action.pages
      }
    case userTypes.USER_LOGOUT:
      return {}
    case pizzaTypes.PIZZA_CLEAR:
      return {}
    default:
      return state
  }
}
