import React from 'react'
import {Table} from 'semantic-ui-react'
import BasketItem from './BasketItem'
import {connect} from 'react-redux'

const BasketItems = props => {
  const {basket} = props

  return (
    <Table fixed textAlign="center">
      <Table.Header>
        <Table.Row>
          <Table.HeaderCell />
          <Table.HeaderCell>Title</Table.HeaderCell>
          <Table.HeaderCell>Price</Table.HeaderCell>
          <Table.HeaderCell>Size</Table.HeaderCell>
          <Table.HeaderCell>Amount</Table.HeaderCell>
          <Table.HeaderCell>Total</Table.HeaderCell>
        </Table.Row>
      </Table.Header>
      <Table.Body>{basket.map((item, ind) => <BasketItem {...item} key={ind} />)}</Table.Body>
      <Table.Footer>
        <Table.Row>
          <Table.HeaderCell colSpan="6">
            <h2>Total price : {basket.reduce((prev, curr) => prev + curr.total, 0)} $</h2>
          </Table.HeaderCell>
        </Table.Row>
      </Table.Footer>
    </Table>
  )
}

const mapStateToProps = (state, ownProps) => {
  const basket = ownProps.basket

  return {
    basket
  }
}

const mapDispatchToProps = dispatch => {
  return {}
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(BasketItems)
