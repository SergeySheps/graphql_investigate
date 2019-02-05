import React, {Component} from 'react'
import {Button, Menu, Icon} from 'semantic-ui-react'
import {Link} from 'react-router-dom'
import {connect} from 'react-redux'
import {userActions} from '../../actions/userActions'
import ModalBasket from '../modals/ModalBasket'

class HeaderNavigationBar extends Component {
  render() {
    const {logout, isLoggedIn} = this.props

    return (
      <Menu size="large" className="header__menu">
        <div className="menu__logo">
          <Link to="/main">Serjio's pizza</Link>
        </div>
        {isLoggedIn ? (
          <Menu.Menu position="right">
            <Menu.Item>
              <Link to="/main/history">
                <Button icon labelPosition="left" color="vk">
                  <Icon name="clipboard list" />
                  History
                </Button>
              </Link>
            </Menu.Item>
            <Menu.Item>
              <ModalBasket />
            </Menu.Item>
            <Menu.Item>
              <Button onClick={() => logout()} secondary>
                Logout
              </Button>
            </Menu.Item>
          </Menu.Menu>
        ) : (
          <Menu.Menu position="right">
            <Menu.Item>
              <Link to="/login" className="menu__authorization-item">
                <Button primary>Sign In</Button>
              </Link>
            </Menu.Item>
            <Menu.Item>
              <Link to="/registration" className="menu__authorization-item">
                <Button primary>Sign Up</Button>
              </Link>
            </Menu.Item>
          </Menu.Menu>
        )}
      </Menu>
    )
  }
}

const mapStateToProps = state => {
  const {isLoggedIn} = state.login

  return {
    isLoggedIn
  }
}

const mapDispatchToProps = dispatch => {
  return {
    logout: () => {
      dispatch(userActions.logout())
    }
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(HeaderNavigationBar)
