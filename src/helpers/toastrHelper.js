import {toastr} from 'react-redux-toastr'

export const toastrNotification = (type, data, toastrOptions) => {
  toastr[type](data.title, data.message, toastrOptions)
}
