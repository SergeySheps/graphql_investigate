import React, {Component} from 'react'
import {Button, Modal, Icon} from 'semantic-ui-react'
import QueueItems from '../oredersQueue/QueueItems'
import {connect} from 'react-redux'
import {employeeActions} from '../../actions/employeeActions'
import {sortListByFinishDate} from '../../helpers/dateTimeHelper'

class ModalDayReport extends Component {
  state = {
    open: false
  }

  handleClose = () => {
    this.setState({
      open: false
    })
  }

  handleTriggerButton = () => {
    const {getDayReport, email} = this.props

    getDayReport(email)

    this.setState({
      open: true
    })
  }

  render() {
    const {dayReport} = this.props

    return (
      <Modal
        dimmer="blurring"
        trigger={
          <Button primary icon labelPosition="left" onClick={this.handleTriggerButton} className="semantic-ui-buttons-width-auto">
            <Icon name="ordered list" />
            Show day report
          </Button>
        }
        open={this.state.open}
        onClose={() => this.handleClose()}
        size="large">
        <Modal.Header>
          <Icon name="ordered list" /> Day report
        </Modal.Header>
        <Modal.Content scrolling className="modal-window__content">
          {!dayReport ? (
            <Icon name="spinner" loading />
          ) : dayReport.length > 0 ? (
            sortListByFinishDate(dayReport, false).map(el => (
              <QueueItems
                queue={el.order}
                isCookHistory={true}
                finishOrderDate={el.finishOrderDate}
                key={el.id}
              />
            ))
          ) : (
            <h2 className="modal-window__text">Today there are no ready orders</h2>
          )}
        </Modal.Content>
      </Modal>
    )
  }
}

const mapStateToProps = state => {
  const dayReport = state.dayReport
  const {email} = state.login

  return {
    email,
    dayReport
  }
}

const mapDispatchToProps = dispatch => {
  return {
    getDayReport: values => dispatch(employeeActions.getDayReport(values))
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ModalDayReport)
