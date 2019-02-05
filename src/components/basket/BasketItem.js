import React from 'react'
import {Table, Icon, Header} from 'semantic-ui-react'
import {pizzaActions} from '../../actions/pizzaActions'
import {connect} from 'react-redux'

const BasketItem = props => {
  const {
    urlImage,
    size,
    title,
    amount,
    price,
    ingredients,
    incrementPizzaAmount,
    total
  } = props

  const basket = JSON.parse(sessionStorage.getItem("basket"))

  const incrementAmount = () => {
    const updatedBasket = basket.map(el => {
      const newAmount = amount + 1
      return title === el.title && size === el.size
        ? {...el, amount: newAmount, total: price * newAmount}
        : el
    })
    incrementPizzaAmount(updatedBasket)
  }

  const decrementAmount = () => {
    if (amount - 1 >= 0) {
      const updatedBasket = basket
        .map(el => {
          const newAmount = amount - 1
          return title === el.title && size === el.size
            ? {...el, amount: newAmount, total: price * newAmount}
            : el
        })
        .filter(el => el.amount > 0)
      incrementPizzaAmount(updatedBasket)
    }
  }

  return (
    <Table.Row>
      <Table.Cell>
        <img src={require(`../../static/${urlImage}`)} alt="^_^" width="80" height="80" />
      </Table.Cell>
      <Table.Cell>
        <Header as="h3">{title}</Header>
        {ingredients
          .map(ingredient => {
            return `${ingredient.name} x ${ingredient.amount}`
          })
          .join('; ')}
      </Table.Cell>
      <Table.Cell>{price} $</Table.Cell>
      <Table.Cell>{size} cm</Table.Cell>
      <Table.Cell>
        <Icon name="minus" className="button-reduce-inrgedient" onClick={() => decrementAmount()} />
        x {amount}
        <Icon name="plus" className="button-add-inrgedient" onClick={() => incrementAmount()} />
      </Table.Cell>
      <Table.Cell>{total} $</Table.Cell>
    </Table.Row>
  )
}

const mapStateToProps = state => {
  const basket = state.basket

  return {
    basket
  }
}

const mapDispatchToProps = dispatch => {
  return {
    incrementPizzaAmount: amount => dispatch(pizzaActions.incrementPizzaAmount(amount))
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(BasketItem)
