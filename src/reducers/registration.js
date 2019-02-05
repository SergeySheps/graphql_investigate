import {userTypes} from '../actions/types'

export function registration(state = {}, action) {
  switch (action.type) {
    case userTypes.REGISTER_REQUEST:
      return {
        isRegistrationInProgress: true
      }
    case userTypes.REGISTER_SUCCESS:
      return {
        hasBeenRegistered: true
      }
    case userTypes.REGISTER_FAILURE:
      return {
        hasRegistrationFailed: true
      }
    case userTypes.REGISTER_CLEAR:
      return {}
    case userTypes.USER_LOGOUT:
      return {}
    default:
      return state
  }
}
