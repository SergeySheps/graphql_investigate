import React, {Component} from 'react'
import {Modal, Icon, Table} from 'semantic-ui-react'
import QueueItems from '../oredersQueue/QueueItems'
import {connect} from 'react-redux'

class ModalEjectOrder extends Component {
  render() {
    const {ordersQueue} = this.props

    return (
      <Modal
        dimmer="blurring"
        trigger={
          <Table.Cell selectable className="table-cell_eject-order">
            {' '}
            Click for view
          </Table.Cell>
        }
        size="large"
        closeIcon>
        <Modal.Header>
          <Icon name="ordered list" /> Order
        </Modal.Header>
        <Modal.Content scrolling className="modal-window__content">
          {ordersQueue ? <QueueItems queue={ordersQueue} /> : ''}
        </Modal.Content>
      </Modal>
    )
  }
}

const mapStateToProps = (state, ownProps) => {
  const ordersQueue = ownProps.ordersQueue

  return {
    ordersQueue
  }
}

export default connect(mapStateToProps)(ModalEjectOrder)
