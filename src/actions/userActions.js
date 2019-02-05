import {userTypes} from './types'
import {userService} from '../services/userService'

export const userActions = {
  login,
  register,
  registerClear,
  logout,
  checkExistingToken,
  submitPizzaOrder,
  getOrdersHistory,
  updateOrdersHistory,
  addOrderToHistory
}

function login({email, password}) {
  return dispatch => {
    userService.login(email, password).then(
      user => {
        dispatch(loginSuccess(user))
      },
      error => {
        dispatch(loginFailure({error}))
      }
    )
  }

  function loginSuccess(user) {
    return {
      type: userTypes.LOGIN_SUCCESS,
      user
    }
  }

  function loginFailure(error) {
    return {
      type: userTypes.LOGIN_FAILURE,
      error
    }
  }
}

function logout() {
  setTimeout(() => userService.logout(), 2500)

  return {
    type: userTypes.USER_LOGOUT
  }
}

function checkExistingToken() {
  return {
    type: userTypes.LOGIN_REQUEST
  }
}

function registerClear() {
  return {
    type: userTypes.REGISTER_CLEAR
  }
}

function register(user) {
  return dispatch => {
    userService.register(user).then(
      user => {
        dispatch(registerSuccess(user))
      },
      error => {
        dispatch(registerFailure(error.toString()))
      }
    )
  }

  function registerSuccess(user) {
    return {
      type: userTypes.REGISTER_SUCCESS,
      user
    }
  }

  function registerFailure(error) {
    return {
      type: userTypes.REGISTER_FAILURE,
      error
    }
  }
}

function submitPizzaOrder(orderData) {
  return dispatch => {
    userService.submitPizzaOrder(orderData).then(
      order => {
        dispatch(orderSuccess())
      },
      error => {
        dispatch(orderFailure(error.toString()))
      }
    )
  }

  function orderSuccess() {
    return {
      type: userTypes.ORDER_SUCCESS
    }
  }

  function orderFailure() {
    return {
      type: userTypes.ORDER_FAILURE
    }
  }
}

function getOrdersHistory(email) {
  return dispatch => {
    userService.getOrdersHistory(email).then(
      history => {
        dispatch(getOrdersHistorySuccess(history))
      },
      error => {
        dispatch(getOrdersHistoryFailure())
      }
    )
  }

  function getOrdersHistorySuccess(history) {
    return {
      type: userTypes.ORDERS_HISTORY_SUCCESS,
      history
    }
  }

  function getOrdersHistoryFailure() {
    return {
      type: userTypes.ORDERS_HISTORY_FAILURE
    }
  }
}

function updateOrdersHistory(newHistory) {
  return {
    type: userTypes.ORDERS_HISTORY_UPDATE,
    newHistory
  }
}

function addOrderToHistory(order) {
  return {
    type: userTypes.ORDERS_HISTORY_ADD,
    order
  }
}
