import {employeeTypes, userTypes} from '../actions/types'

export function ordersQueue(state = '', action) {
  switch (action.type) {
    case employeeTypes.ORDERS_QUEUE_SUCCESS:
      return action.queue
    case employeeTypes.ORDERS_QUEUE_FAILURE:
      return []
    case userTypes.USER_LOGOUT:
      return ''
    default:
      return state
  }
}
