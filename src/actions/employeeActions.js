import {employeeTypes} from './types'
import {employeeService} from '../services/employeeService'
import {toastrNotification} from '../helpers/toastrHelper'
import {toastrNotificationData} from '../constants/constants'

export const employeeActions = {
  getOrdersQueue,
  saveOrderAcceptor,
  getOrdersInProgress,
  saveReadyOrder,
  deleteOrderFromQueue,
  getCookedOrdersHistory,
  saveStartTime,
  saveFinishTime,
  getStartTime,
  getDayReport,
  clear
}

function getOrdersQueue() {
  return dispatch => {
    employeeService.getOrdersQueue().then(
      queue => {
        dispatch(getOrdersQueueSuccess(queue))
      },
      error => {
        dispatch(getOrdersQueueFailure())
      }
    )
  }

  function getOrdersQueueSuccess(queue) {
    return {
      type: employeeTypes.ORDERS_QUEUE_SUCCESS,
      queue
    }
  }

  function getOrdersQueueFailure() {
    return {
      type: employeeTypes.ORDERS_QUEUE_FAILURE
    }
  }
}

function getCookedOrdersHistory(email) {
  return dispatch => {
    employeeService.getCookedOrdersHistory(email).then(
      history => {
        dispatch(getCookedOrdersHistorySuccess(history))
      },
      error => {
        dispatch(getCookedOrdersHistoryFailure())
      }
    )
  }

  function getCookedOrdersHistorySuccess(history) {
    return {
      type: employeeTypes.ORDERS_COOKED_ORDERS_SUCCESS,
      history
    }
  }

  function getCookedOrdersHistoryFailure() {
    return {
      type: employeeTypes.ORDERS_COOKED_ORDERS_FAILURE
    }
  }
}

function saveOrderAcceptor(acceptorData) {
  return dispatch => {
    employeeService.saveOrderAcceptor(acceptorData).then(
      resolve => {
        toastrNotification('success', toastrNotificationData.orderAcceptSuccess, {
          position: 'bottom-right'
        })
      },
      error => {
        toastrNotification('error', toastrNotificationData.orderAcceptFailure, {
          position: 'bottom-right'
        })
      }
    )
  }
}

function deleteOrderFromQueue(orderData) {
  return dispatch => {
    employeeService.deleteOrderFromQueue(orderData).then(
      deletedOrder => {
        dispatch(deleteOrderFromQueueSuccess(deletedOrder))
      },
      error => {
        toastrNotification('error', toastrNotificationData.deleteOrderFailure, {
          position: 'bottom-right'
        })
      }
    )
  }

  function deleteOrderFromQueueSuccess(deletedOrder) {
    return {
      type: employeeTypes.ORDERS_DELETED_ORDER_SUCCESS,
      deletedOrder
    }
  }
}

function saveReadyOrder(orderData) {
  return dispatch => {
    employeeService.saveReadyOrder(orderData)
  }
}

function getOrdersInProgress(email) {
  return dispatch => {
    employeeService.getOrdersInProgress(email).then(
      orders => {
        dispatch(getOrdersInProgress(orders))
      },
      error => {
        toastrNotification('error', toastrNotificationData.getproductsError, {
          position: 'bottom-right'
        })
      }
    )
  }

  function getOrdersInProgress(orders) {
    return {
      type: employeeTypes.ORDERS_ACTIVE_ORDERS_SUCCESS,
      orders
    }
  }
}

function saveStartTime(timeData) {
  return dispatch => {
    employeeService.saveStartTime(timeData).then(null, error => {
      toastrNotification('error', toastrNotificationData.startDayFailure, {
        position: 'bottom-right'
      })
    })
  }
}

function saveFinishTime(timeData) {
  return dispatch => {
    employeeService.saveFinishTime(timeData).then(
      time => {
        dispatch(getStartTimeSuccess(time))
        toastrNotification('success', toastrNotificationData.saveFinishTimeSuccess, {
          position: 'bottom-right'
        })
      },
      error => {
        toastrNotification('error', toastrNotificationData.saveFinishTimeFailure, {
          position: 'bottom-right'
        })
      }
    )
  }

  function getStartTimeSuccess(time) {
    return {
      type: employeeTypes.TIME_START_SUCCESS,
      time
    }
  }
}

function getStartTime(email) {
  return dispatch => {
    employeeService.getStartTime(email).then(
      time => {
        dispatch(getStartTimeSuccess(time))
      },
      error => {
        dispatch(getStartTimeFailure())
      }
    )
  }

  function getStartTimeSuccess(time) {
    return {
      type: employeeTypes.TIME_START_SUCCESS,
      time
    }
  }

  function getStartTimeFailure() {
    return {
      type: employeeTypes.TIME_START_FAILURE
    }
  }
}

function getDayReport(email) {
  return dispatch => {
    employeeService.getDayReport(email).then(
      report => {
        dispatch(getDayReportSuccess(report))
      },
      error => {
        dispatch(getDayReportFailure())
        toastrNotification('error', toastrNotificationData.getproductsError, {
          position: 'bottom-right'
        })
      }
    )
  }

  function getDayReportSuccess(report) {
    return {
      type: employeeTypes.REPORT_GET_SUCCESS,
      report
    }
  }

  function getDayReportFailure() {
    return {
      type: employeeTypes.REPORT_GET_FAILURE
    }
  }
}

function clear() {
  return {
    type: employeeTypes.ORDERS_ACTIVE_ORDERS_CLEAR
  }
}
