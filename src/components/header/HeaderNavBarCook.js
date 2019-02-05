import React, {Component} from 'react'
import {Button, Menu, Icon} from 'semantic-ui-react'
import {Link} from 'react-router-dom'
import {connect} from 'react-redux'
import {userActions} from '../../actions/userActions'
import '../../styles/menu.css'
import ModalPizzasQueue from '../modals/ModalPizzasQueue'

class HeaderNavBarCook extends Component {
  render() {
    const {logout} = this.props

    return (
      <Menu size="large" className="header__menu">
        <div className="menu__logo">
          <Link to="/cook">Serjio's pizza</Link>
        </div>
        <Menu.Menu position="right">
          <Menu.Item>
            <Link to="/cook/history">
              <Button icon labelPosition="left" color="vk">
                <Icon name="clipboard list" />
                Cooked orders
              </Button>
            </Link>
          </Menu.Item>
          <Menu.Item>
            <ModalPizzasQueue />
          </Menu.Item>
          <Menu.Item>
            <Button onClick={() => logout()} secondary>
              Logout
            </Button>
          </Menu.Item>
        </Menu.Menu>
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
)(HeaderNavBarCook)
