import {userTypes} from '../actions/types'

export function ordersHistory(state = '', action) {
  switch (action.type) {
    case userTypes.ORDERS_HISTORY_ADD: {
      return [...state, action.order]
    }
    case userTypes.ORDERS_HISTORY_SUCCESS:
      return action.history
    case userTypes.ORDERS_HISTORY_UPDATE:
      return action.newHistory
    case userTypes.ORDERS_HISTORY_FAILURE:
    case userTypes.USER_LOGOUT:
      return []
    default:
      return state
  }
}
