import {combineReducers} from 'redux'
import {reducer as formReducer} from 'redux-form'
import {reducer as toastrReducer} from 'react-redux-toastr'
import {login} from './login'
import {pizza} from './pizza'
import {basket} from './basket'
import {cookedOrders} from './cookedOrders'
import {dayReport} from './dayReport'
import {order} from './order'
import {timeJournal} from './timeJournal'
import {ordersHistory} from './ordersHistory'
import {ordersQueue} from './ordersQueue'
import {addedIngredients} from './addedIngredients'
import {registration} from './registration'
import {activeOrders} from './activeOrders'

const rootReducer = combineReducers({
  login,
  addedIngredients,
  registration,
  pizza,
  form: formReducer,
  basket,
  order,
  ordersHistory,
  ordersQueue,
  activeOrders,
  cookedOrders,
  timeJournal,
  dayReport,
  toastr: toastrReducer
})

export default rootReducer
