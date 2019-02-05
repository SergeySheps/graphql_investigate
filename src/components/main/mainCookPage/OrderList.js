import React, {Component} from 'react'
import {Table, Button} from 'semantic-ui-react'
import QueueItems from '../../oredersQueue/QueueItems'
import {employeeActions} from '../../../actions/employeeActions'
import {connect} from 'react-redux'

class OrderList extends Component {
  handleFinishOrder = () => {
    const {
      saveReadyOrder,
      deleteOrderFromQueue,
      order,
      email
    } = this.props

    saveReadyOrder({
      cookEmail: email,
      order: order.pizzaData
    })

    deleteOrderFromQueue({id: order.id})
  }

  render() {
    const {order} = this.props

    return (
      <Table color="teal" textAlign="center">
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>Pizzas</Table.HeaderCell>
            <Table.HeaderCell />
          </Table.Row>
        </Table.Header>
        <Table.Body>
          <Table.Row>
            <Table.Cell>{order ? <QueueItems queue={order.pizzaData} /> : ''}</Table.Cell>
            <Table.Cell>
              <Button fluid={false} color="green" onClick={this.handleFinishOrder}>
                Finish
              </Button>
            </Table.Cell>
          </Table.Row>
        </Table.Body>
      </Table>
    )
  }
}

const mapStateToProps = (state, ownProps) => {
  const order = ownProps.activeOrder
  const {email} = state.login

  return {
    order,
    email,
  }
}

function mapDispatchToProps(dispatch) {
  return {
    saveReadyOrder: values => dispatch(employeeActions.saveReadyOrder(values)),
    deleteOrderFromQueue: values => dispatch(employeeActions.deleteOrderFromQueue(values))
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(OrderList)
