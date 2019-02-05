import {pizzaTypes, userTypes} from '../actions/types'

const pizzaBasket = JSON.parse(sessionStorage.getItem('basket'))
const initialState = pizzaBasket ? pizzaBasket : []

export function basket(state = initialState, action) {
  switch (action.type) {
    case pizzaTypes.BASKET_ADD_ITEM: {
      sessionStorage.setItem('basket', JSON.stringify([...state, action.item]))
      return [...state, action.item]
    }
    case pizzaTypes.BASKET_INCREMENT_PIZZA_AMOUNT: {
      sessionStorage.setItem('basket', JSON.stringify(action.updatedBasket))
      return action.updatedBasket
    }
    case userTypes.USER_LOGOUT:
      return []
    default:
      return state
  }
}
