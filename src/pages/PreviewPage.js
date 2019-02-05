import React, {Component} from 'react'
import Header from '../components/header/Header'
import Main from '../components/main/main_MainPage/Main'
import {connect} from 'react-redux'
import {Redirect} from 'react-router-dom'

class Previewpage extends Component {
  state = {
    isRedirect: false
  }

  handleCheckToken = event => {
    const {isLoggedIn} = this.props
    const {target} = event

    if (!isLoggedIn && target.closest('.ui.pagination')) {
      return
    }

    this.setState({
      isRedirect: true
    })
  }

  render() {
    const {isRedirect} = this.state
    const {isLoggedIn, isEmployee} = this.props

    if (isLoggedIn && isEmployee) {
      return <Redirect to="/cook" />
    }

    if (isRedirect && !isLoggedIn) {
      return <Redirect to="/login" />
    } else if (isRedirect && isLoggedIn) {
      return <Redirect to="/main" />
    }

    return (
      <React.Fragment>
        <div className="check-token-wrapper" onClick={this.handleCheckToken}>
          <Header />
          <Main />
        </div>
      </React.Fragment>
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

export default connect(
  mapStateToProps,
  null
)(Previewpage)
