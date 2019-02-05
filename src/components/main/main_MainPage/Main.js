import React, {Component} from 'react'
import {connect} from 'react-redux'
import {Button} from 'semantic-ui-react'
import PizzaConstructor from './pizzaConstructor/PizzaConstructor'
import CardField from './pizzaMenu/CardField'
import {pizzaActions} from '../../../actions/pizzaActions'
import '../../../styles/main.css'

class Main extends Component {
  state = {
    isCreateYourself: false
  }

  handleCreateYourself = () => {
    this.setState({
      isCreateYourself: !this.state.isCreateYourself
    })

    const {getProductsFromDB} = this.props

    getProductsFromDB()
  }

  render() {
    const {isCreateYourself} = this.state

    return (
      <main className="main__mainPage">
        <Button primary onClick={this.handleCreateYourself} className="create-pizza-yourself-button">
          {!isCreateYourself ? 'Create your pizza yourself' : 'Choose pizza from the menu'}
        </Button>
        {isCreateYourself ? <PizzaConstructor /> : <CardField />}
      </main>
    )
  }
}

const mapDispatchToProps = dispatch => {
  return {
    getProductsFromDB: () => dispatch(pizzaActions.getProductsFromDB())
  }
}

export default connect(
  null,
  mapDispatchToProps
)(Main)
