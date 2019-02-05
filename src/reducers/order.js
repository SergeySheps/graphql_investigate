import {userTypes} from '../actions/types'

export function order(state = {}, action) {
  switch (action.type) {
    case userTypes.ORDER_SUCCESS:
      return {
        hasSuccessOrder: true
      }
    case userTypes.ORDER_FAILURE:
      return {
        hasSuccessOrder: false
      }
    case userTypes.USER_LOGOUT:
      return {}
    default:
      return {}
  }
}
