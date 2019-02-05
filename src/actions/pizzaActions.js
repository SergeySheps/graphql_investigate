import {pizzaTypes} from './types'
import {pizzaService} from '../services/pizzaService'
import api from '../api/api'

export const pizzaActions = {
  getProductsFromDB,
  createPriceFromSize,
  addIngredient,
  refreshIngredients,
  clear,
  changePaginationPage,
  addBasketItem,
  incrementPizzaAmount,
  getPizzasFromDB
}

function getPizzasFromDB(numPage) {
  return dispatch => {
    api
      .getGraphqlRequestWithoutToken(
        `?query={pizzas(numPage:${numPage}){pages,docs{id,type,image,composition,name}}}`
      )
      .then(
        products => {
          dispatch(getPizzasSuccess(products.data.pizzas))
        },
        error => {
          dispatch(getProductsFailure())
        }
      )
  }

  function getPizzasSuccess(products) {
    return {
      type: pizzaTypes.PIZZA_GET_PIZZAS_SUCCESS,
      products
    }
  }
}

function getProductsFromDB(queryString) {
  return dispatch => {
    pizzaService.getProductsFromDB(queryString).then(
      products => {
        // products.docs
        // ? dispatch(getPizzasSuccess(products))
        dispatch(getProductsSuccess(products))
      },
      error => {
        dispatch(getProductsFailure())
      }
    )
  }
}

function getProductsSuccess(products) {
  return {
    type: pizzaTypes.PIZZA_GET_PRODUCTS_SUCCESS,
    products
  }
}

function getProductsFailure() {
  return {
    type: pizzaTypes.PIZZA_GET_PRODUCTS_FAILURE
  }
}

function changePaginationPage(page) {
  return {
    type: pizzaTypes.PIZZA_CHANGE_PAGINATION_PAGE,
    page
  }
}

function createPriceFromSize(products, nextIndexSize) {
  return {
    type: pizzaTypes.PIZZA_CREATE_PRICE_FROM_SIZE,
    products,
    nextIndexSize
  }
}

function addIngredient(ingredient) {
  return {
    type: pizzaTypes.PIZZA_ADD_INGREDIENT,
    ingredient
  }
}

function refreshIngredients(ingredients) {
  return {
    type: pizzaTypes.PIZZA_REFRESH_INGREDIENTS,
    ingredients
  }
}

function addBasketItem(item) {
  return {
    type: pizzaTypes.BASKET_ADD_ITEM,
    item
  }
}

function incrementPizzaAmount(updatedBasket) {
  return {
    type: pizzaTypes.BASKET_INCREMENT_PIZZA_AMOUNT,
    updatedBasket
  }
}

function clear() {
  return {
    type: pizzaTypes.PIZZA_CLEAR
  }
}
