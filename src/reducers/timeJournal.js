import {employeeTypes, userTypes} from '../actions/types'

export function timeJournal(state = '', action) {
  switch (action.type) {
    case employeeTypes.TIME_START_SUCCESS:
      return action.time
    case employeeTypes.TIME_START_FAILURE:
    case userTypes.USER_LOGOUT:
      return ''
    default:
      return state
  }
}
