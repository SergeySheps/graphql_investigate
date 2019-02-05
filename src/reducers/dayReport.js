import {employeeTypes, userTypes} from '../actions/types'

export function dayReport(state = '', action) {
  switch (action.type) {
    case employeeTypes.REPORT_GET_SUCCESS:
      return action.report
    case employeeTypes.REPORT_GET_FAILURE:
    case userTypes.USER_LOGOUT:
      return []
    default:
      return state
  }
}