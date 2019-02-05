import React, {Component} from 'react'
import Header from '../components/header/Header'
import Main from '../components/main/mainCookPage/CookMain'
import {userActions} from '../actions/userActions'
import {connect} from 'react-redux'
import {Redirect} from 'react-router-dom'
import {getLocalStorageItem} from '../helpers/authorizationHelper'

class CookPage extends Component {
  state = {
    hasToken: true
  }

  handleCheckToken = () => {
    if (!getLocalStorageItem('token')) {
      this.setState({
        hasToken: false
      })
    }
  }

  render() {
    const {isLoggedIn, logout, isEmployee} = this.props

    if (!isLoggedIn) {
      return <Redirect to="/" />
    }

    if (!getLocalStorageItem('token')) {
      logout()
      return <Redirect to="/login" />
    }

    if (isLoggedIn && !isEmployee) {
      return <Redirect to="/main" />
    }

    return (
      <div className="check-token-wrapper" onClick={this.handleCheckToken}>
        <Header />
        <Main />
      </div>
    )
  }
}

function mapStateToProps(state) {
  const {isLoggedIn, isEmployee} = state.login

  return {
    isLoggedIn,
    isEmployee
  }
}

function mapDispatchToProps(dispatch) {
  return {
    logout: () => dispatch(userActions.logout())
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CookPage)
