import React, {Component} from 'react'
import RegistrationForm from '../components/RegistrationForm'
import {userActions} from '../actions/userActions'
import {connect} from 'react-redux'
import {Redirect} from 'react-router-dom'
import {toastrNotification} from '../helpers/toastrHelper'
import {toastrNotificationData} from '../constants/constants'

class RegistrationPage extends Component {
  componentDidUpdate(prevProps, prevState) {
    const {hasRegistrationFailed, onRegisterClear} = this.props

    if (hasRegistrationFailed !== prevProps.hasRegistrationFailed) {
      if (hasRegistrationFailed) {
        toastrNotification('error', toastrNotificationData.registrationError)
        onRegisterClear()
      }
    }
  }

  render() {
    const {register, hasBeenRegistered, onRegisterClear} = this.props

    if (hasBeenRegistered) {
      onRegisterClear()
      toastrNotification('success', toastrNotificationData.registrationSuccess)
      return <Redirect to="/login" />
    }

    return (
      <div className="registration">
        <div className="registration__content">
          <RegistrationForm onSubmit={values => register(values)} />
        </div>
      </div>
    )
  }
}

function mapStateToProps(state) {
  const {hasBeenRegistered, hasRegistrationFailed} = state.registration

  return {
    hasBeenRegistered,
    hasRegistrationFailed
  }
}

function mapDispatchToProps(dispatch) {
  return {
    register: registerFieldvalues => {
      const result = registerFieldvalues.isEmployee ? registerFieldvalues : {...registerFieldvalues, isEmployee: false}
      dispatch(userActions.register(result))
    },
    onRegisterClear: () => dispatch(userActions.registerClear())
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(RegistrationPage)
