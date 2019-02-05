import React from 'react'
import {connect} from 'react-redux'
import HeaderNavigationBar from './HeaderNavigationBar'
import HeaderNavBarCook from './HeaderNavBarCook'
import '../../styles/header.css'

const Header = props => {
  const {isEmployee} = props
  return <header>{isEmployee ? <HeaderNavBarCook /> : <HeaderNavigationBar />}</header>
}

function mapStateToProps(state) {
  const {isEmployee} = state.login
  return {
    isEmployee
  }
}

export default connect(mapStateToProps)(Header)
