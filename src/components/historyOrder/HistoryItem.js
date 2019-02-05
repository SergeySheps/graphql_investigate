import React from 'react'
import {Table, Button, Icon} from 'semantic-ui-react'
import {connect} from 'react-redux'
import HistoryPizzasRow from './HistoryPizzasRow'
import {userActions} from '../../actions/userActions'

const HistoryItem = props => {
  const {
    creationDate,
    pizzaData,
    userData,
    totalPrice,
    submitPizzaOrder,
    addOrderToHistory
  } = props

  const handleOrderAgain = () => {
    if (!window.confirm('Do you really want to repeat the order?')) {
      return
    }
    
    const orderData = {
      userData: props.userData,
      pizzaData: props.pizzaData,
      email: props.email,
      totalPrice: props.totalPrice
    }

    submitPizzaOrder(orderData)
    addOrderToHistory({...orderData, creationDate: new Date().toLocaleString()})
  }

  return (
    <Table.Row>
      <Table.Cell>{new Date(creationDate).toLocaleString()}</Table.Cell>
      <Table.Cell>
        <Table textAlign="center" singleLine>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell>Title</Table.HeaderCell>
              <Table.HeaderCell>Size</Table.HeaderCell>
              <Table.HeaderCell>Amount</Table.HeaderCell>
              <Table.HeaderCell>Total price</Table.HeaderCell>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            {pizzaData.map((pizza, ind) => (
              <HistoryPizzasRow pizza={pizza} key={ind} />
            ))}
          </Table.Body>
        </Table>
      </Table.Cell>
      <Table.Cell>
        <Table definition singleLine>
          <Table.Body>
            <Table.Row>
              <Table.Cell>Street</Table.Cell>
              <Table.Cell>{userData.street}</Table.Cell>
            </Table.Row>
            <Table.Row>
              <Table.Cell>House number</Table.Cell>
              <Table.Cell>{userData.houseNumber}</Table.Cell>
            </Table.Row>
            <Table.Row>
              <Table.Cell>Apartment number</Table.Cell>
              <Table.Cell>{userData.apartmentNumber}</Table.Cell>
            </Table.Row>
            <Table.Row>
              <Table.Cell>Phone number</Table.Cell>
              <Table.Cell>{userData.tel}</Table.Cell>
            </Table.Row>
          </Table.Body>
        </Table>
      </Table.Cell>
      <Table.Cell>{totalPrice} $</Table.Cell>
      <Table.Cell>
        <Button icon labelPosition="left" positive onClick={() => handleOrderAgain()}>
          <Icon name="repeat" />
          Order again
        </Button>
      </Table.Cell>
    </Table.Row>
  )
}

function mapDispatchToProps(dispatch) {
  return {
    submitPizzaOrder: values => dispatch(userActions.submitPizzaOrder(values)),
    addOrderToHistory: values => dispatch(userActions.addOrderToHistory(values))
  }
}

export default connect(
  null,
  mapDispatchToProps
)(HistoryItem)
