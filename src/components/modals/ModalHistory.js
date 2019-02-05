import React, {Component} from 'react'
import {Modal, Icon} from 'semantic-ui-react'
import {connect} from 'react-redux'
import {Redirect} from 'react-router-dom'
import {userActions} from '../../actions/userActions'
import HistoryItems from '../historyOrder/HistoryItems'
import {sortListByCreationDate} from '../../helpers/dateTimeHelper'

class ModalHistory extends Component {
  state = {
    open: true
  }

  componentWillMount() {
    const {getOrdersHistory, email} = this.props

    getOrdersHistory(email)
  }

  componentDidUpdate(prevProps, prevState) {
    const {history, updateOrdersHistory} = this.props

    if (prevProps.history.length !== history.length) {
      updateOrdersHistory(history)
    }
  }

  handleClose = () => {
    this.setState({
      open: false
    })
  }

  render() {
    if (!this.state.open) {
      return <Redirect to="/main" />
    }

    const {history} = this.props

    return (
      <div>
        <Modal
          dimmer="blurring"
          open={this.state.open}
          onClose={() => this.handleClose()}
          size="large"
          closeIcon>
          <Modal.Header>
            <Icon name="clipboard list" /> History
          </Modal.Header>
          <Modal.Content scrolling className="modal-window__content">
            {!history ? (
              <Icon name="spinner" loading />
            ) : history.length > 0 ? (
              <HistoryItems history={sortListByCreationDate(history, false)} />
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
  const history = state.ordersHistory
  const {email} = state.login

  return {
    history,
    email
  }
}

const mapDispatchToProps = dispatch => {
  return {
    getOrdersHistory: email => dispatch(userActions.getOrdersHistory(email)),
    updateOrdersHistory: newHistory =>
      dispatch(userActions.updateOrdersHistory(newHistory))
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ModalHistory)
