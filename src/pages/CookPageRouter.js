import React from 'react'
import {Switch, Route} from 'react-router-dom'
import CookPage from './CookPage'
import CookPageHistory from './CookPageHistory'

const CookPageRouter = () => (
  <Switch>
    <Route exact path="/cook" component={CookPage} />
    <Route path="/cook/history" component={CookPageHistory} />
  </Switch>
)

export default CookPageRouter