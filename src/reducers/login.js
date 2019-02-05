import {userTypes} from '../actions/types'
import {getLocalStorageItem} from '../helpers/authorizationHelper'

const user = JSON.parse(getLocalStorageItem('user'))
const initialState = user ? {isLoggedIn: true, ...user} : {}

export function login(state = initialState, action) {
  switch (action.type) {
    case userTypes.LOGIN_REQUEST:
      return {
        hasToken: !!getLocalStorageItem('token'),
        ...action.user
      }
    case userTypes.LOGIN_SUCCESS:
      return {
        isLoggedIn: true,
        ...action.user
      }
    case userTypes.LOGIN_FAILURE:
      return {
        isLoggedIn: false,
        hasLoginFailed: true
      }
    case userTypes.USER_LOGOUT:
      return {}
    default:
      return state
  }
}
