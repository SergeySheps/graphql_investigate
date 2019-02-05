import api from '../api/api'
import {routs} from '../constants/constants'

export const employeeService = {
  getOrdersQueue,
  saveOrderAcceptor,
  getOrdersInProgress,
  saveReadyOrder,
  getCookedOrdersHistory,
  deleteOrderFromQueue,
  saveStartTime,
  saveFinishTime,
  getDayReport,
  getStartTime
}

function getOrdersQueue() {
  return api.getRequestWithToken(routs.cook)
}

function saveOrderAcceptor(acceptorData) {
  return api.putRequestWithToken(routs.cook, acceptorData)
}

function getOrdersInProgress(email) {
  return api.postRequestWithToken(routs.cook, {email})
}

function saveReadyOrder(orderData) {
  return api.postRequestWithToken(routs.cook + `?isSaveReadyOrder=true`, orderData)
}

function deleteOrderFromQueue(orderData) {
  return api.deleteRequestWithToken(routs.cook, orderData)
}

function getCookedOrdersHistory(email) {
  return api.postRequestWithToken(routs.cookHistory, {email})
}

function saveStartTime(timeData) {
  return api.postRequestWithToken(routs.cook + `?isSaveStartWorkTime=true`, timeData)
}

function saveFinishTime(timeData) {
  return api.putRequestWithToken(routs.cook + `?isSaveFinishWorkTime=true`, timeData)
}

function getStartTime(email) {
  return api.postRequestWithToken(routs.cook + `?isGetStartWorkTime=true`, {email})
}

function getDayReport(email) {
  return api.postRequestWithToken(routs.cook + `?isGetDayReport=true`, {email})
}
