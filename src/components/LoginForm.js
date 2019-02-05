import React from 'react'
import {Field, reduxForm} from 'redux-form'
import {Link} from 'react-router-dom'
import {Button, Icon} from 'semantic-ui-react'
import {renderСommonTextInput} from './inputComponents/inputComponents'
import '../styles/login.css'

const LoginForm = props => {
  const {handleSubmit, submitting} = props

  return (
    <form className="login__form" onSubmit={handleSubmit}>
      <Link to="/" className="login__link-to-home">
        <Icon disabled name="arrow circle left" size="big" className="link-to-home_icon" />
      </Link>
      <h2 className="login-header-text">Login</h2>
      <Field name="email" type="email" component={renderСommonTextInput} label="Email" />
      <Field name="password" type="password" component={renderСommonTextInput} label="Password" />
      <div className="login__form-item login__form-buttons">
        <div className="login__form-register">
          <span className="login__form-register-description">Don't have an account?</span>
          <Link to="/registration" className="login-to-register-button-link login__form-buttons-item">
            Create an account
          </Link>
        </div>
        <Button type="submit" disabled={submitting} primary className="login__form-buttons-item">
          Sign-in
        </Button>
      </div>
    </form>
  )
}

export default reduxForm({
  form: 'loginForm'
})(LoginForm)
