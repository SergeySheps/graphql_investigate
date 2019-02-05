import React, {Component} from 'react'
import {Button, Modal, Icon} from 'semantic-ui-react'
import QueueOrders from '../oredersQueue/QueueOrders'
import {connect} from 'react-redux'
import {employeeActions} from '../../actions/employeeActions'

class ModalPizzasQueue extends Component {
  state = {
    open: false
  }

  handleClose = () => {
    this.setState({
      open: false
    })
  }

  handleTriggerButton = () => {
    const {getOrdersQueue} = this.props

    getOrdersQueue()

    this.setState({
      open: true
    })
  }

  render() {
    const {ordersQueue} = this.props

    return (
      <Modal
        dimmer="blurring"
        trigger={
          <Button primary icon labelPosition="left" onClick={this.handleTriggerButton}>
            <Icon name="ordered list" />
            Orders queue
          </Button>
        }
        open={this.state.open}
        onClose={() => this.handleClose()}
        size="large">
        <Modal.Header>
          <Icon name="ordered list" /> Orders queue
        </Modal.Header>
        <Modal.Content scrolling className="modal-window__content">
          {!ordersQueue ? (
            <Icon name="spinner" loading />
          ) : ordersQueue.length > 0 ? (
            <QueueOrders queue={ordersQueue} handleClose={this.handleClose} />
          ) : (
            <h2 className="modal-window__text">No orders</h2>
          )}
        </Modal.Content>
      </Modal>
    )
  }
}

const mapStateToProps = state => {
  const ordersQueue = state.ordersQueue

  return {
    ordersQueue
  }
}

const mapDispatchToProps = dispatch => {
  return {
    getOrdersQueue: () => dispatch(employeeActions.getOrdersQueue())
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ModalPizzasQueue)
