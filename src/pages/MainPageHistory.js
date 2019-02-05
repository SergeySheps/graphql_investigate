import React, {Component} from 'react'
import {connect} from 'react-redux'
import {Redirect} from 'react-router-dom'
import ModalHistory from '../components/modals/ModalHistory'


class MainPage extends Component {
  render() {
    const {isLoggedIn,isEmployee} = this.props

    if (isLoggedIn && isEmployee) {
      return <Redirect to="/cook" />
    }
    
    return <ModalHistory />
  }
}

function mapStateToProps(state) {
  const {isLoggedIn,isEmployee} = state.login
  
  return {
    isLoggedIn,
    isEmployee
  }
}

export default connect(mapStateToProps)(MainPage)
