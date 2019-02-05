import React from 'react'
import {Field, reduxForm} from 'redux-form'
import {inputDateRange} from '../constants/constants'
import {Link} from 'react-router-dom'
import {Button, Icon} from 'semantic-ui-react'
import {
  renderTextInputField,
  renderCheckboxInputField,
  renderDateInputField,
  renderEmailInput
} from './inputComponents/inputComponents'
import {userService} from '../services/userService'
import '../styles/register.css'
import {toastrNotification} from '../helpers/toastrHelper'
import {toastrNotificationData} from '../constants/constants'

const validate = values => {
  const errors = {}

  if (!values.firstName) {
    errors.firstName = 'Required'
  }
  if (!values.secondName) {
    errors.secondName = 'Required'
  }
  if (!values.password) {
    errors.password = 'Required'
  } else if (values.password.length < 6) {
    errors.password = 'Must be 6 characters or more'
  } else if (!/[A-Z]/.test(values.password)) {
    errors.password = 'Must contain 1 uppercase letter at least'
  }
  if (!values.confirmedPassword) {
    errors.confirmedPassword = 'Required'
  } else if (values.password !== values.confirmedPassword) {
    errors.confirmedPassword = 'Passwords must be the same'
  }
  if (!values.email) {
    errors.email = 'Required'
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
    errors.email = 'Invalid email address'
  }

  return errors
}

const asyncValidate = values => {
  return userService.checkEqualEmail(values).then(
    response => {
      if (response.equal) {
        // eslint-disable-next-line
        throw {email: 'That email is taken'}
      }
    },
    error => {
      toastrNotification('error', toastrNotificationData.validationError)
    }
  )
}

const RegistrationForm = props => {
  const {handleSubmit, submitting} = props

  return (
    <form className="registration__form" onSubmit={handleSubmit}>
      <Link to="/" className="registration__link-to-home">
        <Icon
          disabled
          name="arrow circle left"
          size="big"
          className="link-to-home_icon"
        />
      </Link>
      <h2 className="registration-header-text">Register</h2>
      <Field
        name="firstName"
        type="text"
        component={renderTextInputField}
        label="First name"
      />
      <Field
        name="secondName"
        type="text"
        component={renderTextInputField}
        label="Second name"
      />
      <Field name="email" type="email" component={renderEmailInput} label="Email" />
      <Field
        name="password"
        type="password"
        component={renderTextInputField}
        label="Password"
      />
      <Field
        name="confirmedPassword"
        type="password"
        component={renderTextInputField}
        label="Confirm Password"
      />
      <Field
        name="birthday"
        type="date"
        component={renderDateInputField}
        label="Birthday"
        min={inputDateRange.min}
        max={inputDateRange.max}
      />
      <Field
        name="isEmployee"
        component={renderCheckboxInputField}
        label="Are you our employee?"
      />
      <div className="registration__form-item registration__form-buttons">
        <Button
          type="submit"
          disabled={submitting}
          primary
          className="registration__form-buttons-item">
          Sign-up
        </Button>
      </div>
    </form>
  )
}

export default reduxForm({
  form: 'registrationForm',
  validate,
  asyncValidate
})(RegistrationForm)
