import React, {Component} from 'react'
import {connect} from 'react-redux'
import {Redirect} from 'react-router-dom'
import ModalCookedOrders from '../components/modals/ModalCookedOrders'


class CookPageHistory extends Component {
  render() {
    const {isLoggedIn,isEmployee} = this.props

    if (isLoggedIn && !isEmployee) {
      return <Redirect to="/main" />
    }
    
    return <ModalCookedOrders />
  }
}

function mapStateToProps(state) {
  const {isLoggedIn,isEmployee} = state.login
  return {
    isLoggedIn,
    isEmployee
  }
}

export default connect(mapStateToProps)(CookPageHistory)