import React, {Component} from 'react'
import {connect} from 'react-redux'
import {pizzaActions} from '../../../../actions/pizzaActions'
import {Tab, Loader, Button} from 'semantic-ui-react'
import {RadioGroupSizes} from './RadioGroupSizes'
import {
  pizzaSizes,
  pizzaTypeIngredients,
  pizzaSizeIndexes,
  pizzaIndexeSizes,
  toastrNotificationData
} from '../../../../constants/constants'
import {
  refreshAddedIngredients,
  getProductsWithUpdatedPrice,
  updateSameIngredient,
  reduceIngredient
} from '../../../../helpers/priceHelper'
import Ingredient from './Ingredient'
import '../../../../styles/constructor.css'
import AddedIngredient from './AddedIngredient'
import {toastrNotification} from '../../../../helpers/toastrHelper'
import {checkRepeatingItem} from '../../../../helpers/basketHelper'

class PizzaConstructor extends Component {
  state = {
    pizzaSizeIndex: pizzaSizeIndexes[pizzaSizes.small]
  }

  componentWillUpdate(nextProps, nextState) {
    const {products, createPriceFromSize} = this.props
    const {pizzaSizeIndex} = this.state

    if (nextState.pizzaSizeIndex !== pizzaSizeIndex) {
      if (products) {
        createPriceFromSize(
          getProductsWithUpdatedPrice(products, pizzaSizeIndex, nextState.pizzaSizeIndex),
          nextState.pizzaSizeIndex
        )
      }
    }
  }

  componentDidUpdate(prevProps, prevState) {
    const {products, refreshIngredients, addedIngredients} = this.props

    if (products !== prevProps.products) {
      refreshIngredients(refreshAddedIngredients(addedIngredients, products))
    }
  }

  createListOfIngredients = (products, type) => {
    return (
      <ul className="all-ingredients-list">
        {products
          .filter(ingredient => ingredient.type === type)
          .map(ingredient => <Ingredient key={ingredient.id} {...ingredient} />)}
      </ul>
    )
  }

  createListOfAddedIngredients = () => {
    const {addedIngredients} = this.props

    return (
      <ul className="added-ingredients-list">
        {addedIngredients
          ? addedIngredients.map((ingredient, ind) => <AddedIngredient key={ind} {...ingredient} />)
          : false}
      </ul>
    )
  }

  addToPizzaBox = () => {
    const {
      addedIngredients,
      basePizzaPrice,
      addBasketItem,
      basket,
      incrementPizzaAmount
    } = this.props
    const newPrice = basePizzaPrice + addedIngredients.reduce((prev, curr) => prev + curr.price, 0)
    const pizzaData = {
      urlImage: 'images_pizzas/base_pizza.jpg',
      title: 'Base',
      price: newPrice,
      size: pizzaIndexeSizes[this.state.pizzaSizeIndex],
      amount: 1,
      total: newPrice,
      ingredients: addedIngredients
    }
    const repeatingItem = checkRepeatingItem(basket, pizzaData)
    repeatingItem ? incrementPizzaAmount(repeatingItem) : addBasketItem(pizzaData)
  }

  choosePizzaSize = (e, {value}) => {
    this.setState({
      pizzaSizeIndex: value
    })
  }

  handleAddReduceIngredients = event => {
    const {classList} = event.target

    if (
      classList.contains('button-add-inrgedient') ||
      classList.contains('button-reduce-inrgedient')
    ) {
      const {addIngredient, products, addedIngredients, refreshIngredients} = this.props

      const ingredient = products.find(
        ingredient =>
          ingredient.name ===
          event.target
            .closest('.ingredient-list__ingredient-text-info')
            .querySelector('.ingredient-list__ingredient-name')
            .textContent.trim()
      )

      if (ingredient) {
        if (classList.contains('button-add-inrgedient')) {
          const repeatingIngredient = addedIngredients.find(el => el.name === ingredient.name)

          if (repeatingIngredient) {
            refreshIngredients(updateSameIngredient(addedIngredients, repeatingIngredient))
          } else {
            addIngredient(ingredient)
          }
        }

        if (classList.contains('button-reduce-inrgedient')) {
          refreshIngredients(reduceIngredient(addedIngredients, ingredient))
        }
      }
    }
  }

  render() {
    const {products, basePizzaPrice, addedIngredients, hasGetProductsFailed} = this.props
    if (hasGetProductsFailed) {
      toastrNotification('error', toastrNotificationData.getproductsError)
      return null
    }
    const panes = [
      {
        menuItem: pizzaTypeIngredients.meat,
        render: () => (
          <Tab.Pane>{this.createListOfIngredients(products, pizzaTypeIngredients.meat)}</Tab.Pane>
        )
      },
      {
        menuItem: pizzaTypeIngredients.cheese,
        render: () => (
          <Tab.Pane>{this.createListOfIngredients(products, pizzaTypeIngredients.cheese)}</Tab.Pane>
        )
      },
      {
        menuItem: pizzaTypeIngredients.vegetables,
        render: () => (
          <Tab.Pane>
            {this.createListOfIngredients(products, pizzaTypeIngredients.vegetables)}
          </Tab.Pane>
        )
      },
      {
        menuItem: pizzaTypeIngredients.sauce,
        render: () => (
          <Tab.Pane>{this.createListOfIngredients(products, pizzaTypeIngredients.sauce)}</Tab.Pane>
        )
      }
    ]

    return products ? (
      <div className="pizza-constructor">
        <RadioGroupSizes choosePizzaSize={this.choosePizzaSize} statePizzaConstuctor={this.state} />
        <div className="pizza-constructor__content">
          <Tab
            panes={panes}
            onClick={this.handleAddReduceIngredients}
            className="pizza-constructor__content-tab-panel"
          />
          <div className="pizza-constructor__content-logging-price">
            Base pizza price: <b>{basePizzaPrice}$</b>
            {this.createListOfAddedIngredients()}
            <div className="pizza-constructor__content-total-price">
              Total price of pizza :{' '}
              <b>
                {basePizzaPrice + addedIngredients.reduce((prev, curr) => prev + curr.price, 0)}$
              </b>
            </div>
            <Button className="add-to-pizza-box-button" primary onClick={this.addToPizzaBox}>
              Add to pizza box
            </Button>
          </div>
        </div>
      </div>
    ) : (
      <Loader active />
    )
  }
}

const mapStateToProps = state => {
  const {products, basePizzaPrice, hasGetProductsFailed} = state.pizza
  const addedIngredients = state.addedIngredients
  const basket = state.basket

  return {
    products,
    basePizzaPrice,
    addedIngredients,
    hasGetProductsFailed,
    basket
  }
}

const mapDispatchToProps = dispatch => {
  return {
    createPriceFromSize: (products, nextSizeIndex) =>
      dispatch(pizzaActions.createPriceFromSize(products, nextSizeIndex)),
    addIngredient: ingredient => dispatch(pizzaActions.addIngredient(ingredient)),
    refreshIngredients: ingredients => dispatch(pizzaActions.refreshIngredients(ingredients)),
    addBasketItem: item => dispatch(pizzaActions.addBasketItem(item)),
    incrementPizzaAmount: updatedBasket =>
      dispatch(pizzaActions.incrementPizzaAmount(updatedBasket))
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PizzaConstructor)
