import api from '../api/api'
import {routs} from '../constants/constants'
import {setLocalStorageItem} from '../helpers/authorizationHelper'

export const userService = {
  login,
  register,
  checkEqualEmail,
  logout,
  submitPizzaOrder,
  getOrdersHistory
}

function login(email, password) {
  return api
    .postGraphqlRequestWithoutToken({
      body: {email, password},
      query: '?query={login{_id,email,token,isEmployee}}'
    })
    .then(
      user => {
        const {token, ...userData} = user
        setLocalStorageItem('token', token)
        setLocalStorageItem('user', JSON.stringify(userData))
        return userData
      },
      error => {
        return Promise.reject(error)
      }
    )
}

function logout() {
  localStorage.clear()
}

function register(user) {
  return api.postRequestWithoutToken(routs.registration, user)
}

function submitPizzaOrder(orderData) {
  return api.postRequestWithToken(routs.main, orderData)
}

function checkEqualEmail({email}) {
  return api.postRequestWithoutToken(routs.checkEqualEmail, {email})
}

function getOrdersHistory(email) {
  return api.postRequestWithToken(routs.mainHistory, {email})
}
