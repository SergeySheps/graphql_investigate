import React from 'react'
import {Provider} from 'react-redux'
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom'
import RegistrationPage from '../pages/RegistrationPage'
import LoginPage from '../pages/LoginPage'
import MainPageRouter from '../pages/MainPageRouter'
import CookPageRouter from '../pages/CookPageRouter'
import PreviewPage from '../pages/PreviewPage'
import ReduxToastr from 'react-redux-toastr'

const Root = ({store}) => {
  return (
    <Provider store={store}>
      <div>
        <ReduxToastr />
        <Router>
          <Switch>
            <Route exact path="/" component={PreviewPage} />
            <Route path="/registration" component={RegistrationPage} />
            <Route path="/login" component={LoginPage} />
            <Route path="/main" component={MainPageRouter} />
            <Route path="/cook" component={CookPageRouter} />
          </Switch>
        </Router>
      </div>
    </Provider>
  )
}

export default Root
