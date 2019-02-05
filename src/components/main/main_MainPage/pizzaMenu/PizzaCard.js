import React, {Component} from 'react'
import {Card, Icon, Button} from 'semantic-ui-react'
import {pizzaSizes, pizzaPrices} from '../../../../constants/constants'
import {RadioSizesPrices} from './RadioSizesPrices'
import {pizzaActions} from '../../../../actions/pizzaActions'
import {connect} from 'react-redux'
import {checkRepeatingItem} from '../../../../helpers/basketHelper'

class PizzaCard extends Component {
  state = {
    amount: 1,
    size: pizzaSizes.small,
    price: pizzaPrices.small
  }

  componentWillMount() {
    const {size, price, amount} = this.state
    const {name, composition, image} = this.props

    this.setState({
      urlImage: image,
      title: name,
      price: price,
      size,
      total: price * amount,
      ingredients: composition.split(',').map(el => {
        return {
          name: el.trim(),
          amount
        }
      })
    })
  }

  componentWillUpdate(nextProps, nextState) {
    if (nextState.size !== this.state.size) {
      this.setState({
        size: nextState.size,
        price: nextState.price,
        total: nextState.price * nextState.amount
      })
    }
  }

  handleAddToBasket = () => {
    const {addBasketItem, basket, incrementPizzaAmount} = this.props
    const repeatingItem = checkRepeatingItem(basket, this.state)

    repeatingItem ? incrementPizzaAmount(repeatingItem) : addBasketItem(this.state)
  }

  choosePizzaSize = (e, {value}) => {
    this.setState({
      size: Number(value.size),
      price: Number(value.price)
    })
  }

  render() {
    const {name, composition, type, image} = this.props

    const extra = (
      <Button
        icon
        labelPosition="left"
        onClick={e => {
          this.handleAddToBasket(e)
        }}>
        <Icon name="inbox" />
        Add to basket
      </Button>
    )

    const description = (
      <div>
        <div className="card-radio-form_description">{composition}</div>
        <RadioSizesPrices choosePizzaSize={this.choosePizzaSize} stateCardField={this.state} />
      </div>
    )

    return (
      <Card
        image={require(`../../../../static/${image}`)}
        header={name}
        meta={type}
        description={description}
        extra={extra}
        className="pizza-card-field__content-item"
      />
    )
  }
}

const mapStateToProps = state => {
  const basket = state.basket

  return {
    basket
  }
}

const mapDispatchToProps = dispatch => {
  return {
    incrementPizzaAmount: updatedBasket => dispatch(pizzaActions.incrementPizzaAmount(updatedBasket))
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PizzaCard)
