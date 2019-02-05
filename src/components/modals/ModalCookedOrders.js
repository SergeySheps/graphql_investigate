import React, {Component} from 'react'
import {Modal, Icon} from 'semantic-ui-react'
import QueueItems from '../oredersQueue/QueueItems'
import {employeeActions} from '../../actions/employeeActions'
import {sortListByFinishDate} from '../../helpers/dateTimeHelper'
import {connect} from 'react-redux'
import {Redirect} from 'react-router-dom'

class ModalCookedOrders extends Component {
  state = {
    open: true
  }

  componentWillMount() {
    const {getCookedOrdersHistory, email} = this.props

    getCookedOrdersHistory(email)
  }

  handleClose = () => {
    this.setState({
      open: false
    })
  }

  render() {
    const {cookedOrders} = this.props

    if (!this.state.open) {
      return <Redirect to="/cook" />
    }

    return (
      <div>
        <Modal
          dimmer="blurring"
          size="large"
          closeIcon
          open={this.state.open}
          onClose={() => this.handleClose()}>
          <Modal.Header>
            <Icon name="ordered list" /> Cooked pizzas
          </Modal.Header>
          <Modal.Content scrolling className="modal-window__content">
            {!cookedOrders ? (
              <Icon name="spinner" loading />
            ) : cookedOrders.length > 0 ? (
              sortListByFinishDate(cookedOrders, false).map(el => (
                <QueueItems
                  queue={el.order}
                  isCookHistory={true}
                  finishOrderDate={el.finishOrderDate}
                  key={el.id}
                />
              ))
            ) : (
              <h2 className="modal-window__text">History is empty</h2>
            )}
          </Modal.Content>
        </Modal>
      </div>
    )
  }
}

const mapStateToProps = state => {
  const cookedOrders = state.cookedOrders
  const {email} = state.login

  return {
    cookedOrders,
    email
  }
}

const mapDispatchToProps = dispatch => {
  return {
    getCookedOrdersHistory: email =>
      dispatch(employeeActions.getCookedOrdersHistory(email))
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ModalCookedOrders)
