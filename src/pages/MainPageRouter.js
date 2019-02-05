import React from 'react'
import {Switch, Route} from 'react-router-dom'
import MainPage from './MainPage'
import MainPageHistory from './MainPageHistory'

const MainPageRouter = () => (
  <Switch>
    <Route exact path="/main" component={MainPage} />
    <Route path="/main/history" component={MainPageHistory} />
  </Switch>
)

export default MainPageRouter
