import React, {Component} from 'react'
import {connect} from 'react-redux'
import {Button, Icon} from 'semantic-ui-react'
import {employeeActions} from '../../../actions/employeeActions'
import {timeConstants} from '../../../constants/constants'
import {
  toDateTime,
  getTimeSinceStart,
  getSecondsFromTime
} from '../../../helpers/dateTimeHelper'
import OrderList from './OrderList'
import '../../../styles/cookMain.css'
import ModalDayReport from '../../modals/ModalDayReport'

class CookMain extends Component {
  state = {
    hasStartWork: false,
    isFinishedWork: false,
    timer: null,
    startTime: null,
    timeSinceStartWork: null
  }

  componentWillMount() {
    const {getOrdersInProgress, email, getStartTime} = this.props

    getOrdersInProgress(email)
    getStartTime(email)
  }

  componentWillUnmount() {
    this.stopTimer()
  }

  stopTimer = () => {
    const {saveFinishTime, email} = this.props
    const {timeSinceStartWork, timer} = this.state

    clearInterval(timer)

    if (!timeSinceStartWork) {
      return
    }

    saveFinishTime({
      email,
      timeSinceStartWork: getSecondsFromTime(getTimeSinceStart(timeSinceStartWork))
    })
  }

  handleStartWork = () => {
    const timer = setInterval(this.tick, 1000)
    const {saveStartTime, email} = this.props

    this.setState({
      startTime: Date.now(),
      timer,
      hasStartWork: true,
      isFinishedWork: false
    })

    saveStartTime({
      email
    })
  }

  handlePauseWork = () => {
    this.setState({
      hasStartWork: false
    })

    this.stopTimer()
  }

  handleFinishWork = () => {
    this.setState({
      hasStartWork: false,
      isFinishedWork: true
    })

    this.stopTimer()
  }

  tick = () => {
    const {timeJournal} = this.props

    this.setState({
      timeSinceStartWork: toDateTime(
        Date.now() -
          this.state.startTime +
          (timeJournal.timeSinceStartWork
            ? timeJournal.timeSinceStartWork * timeConstants.millisecInSec
            : 0)
      )
    })
  }

  showDayReport = () => {
    const {getDayReport, email} = this.props

    getDayReport(email)
  }

  render() {
    const {hasStartWork, isFinishedWork, timeSinceStartWork} = this.state
    const {orders, timeJournal} = this.props

    return (
      <main className="cook__mainPage">
        <div className="manage-panel__content">
          <div className="manage-panel__content-time">
            <h2 className="timer__work-time">
              Time since start work:{' '}
              <span>
                {timeSinceStartWork
                  ? getTimeSinceStart(timeSinceStartWork)
                  : timeJournal.timeSinceStartWork
                    ? getTimeSinceStart(
                        toDateTime(
                          timeJournal.timeSinceStartWork * timeConstants.millisecInSec
                        )
                      )
                    : '00:00:00'}
              </span>
            </h2>
            <div className="manage-panel__content-container-buttons">
              {isFinishedWork ? (
                <ModalDayReport />
              ) : (
                <React.Fragment>
                  <Button
                    icon
                    labelPosition="left"
                    primary
                    onClick={this.handleStartWork}
                    disabled={hasStartWork}>
                    <Icon name="play" />
                    Start work
                  </Button>
                  <Button
                    icon
                    labelPosition="left"
                    primary
                    onClick={this.handlePauseWork}
                    disabled={!hasStartWork}>
                    <Icon name="pause" />
                    Pause
                  </Button>
                  <Button
                    icon
                    labelPosition="left"
                    primary
                    onClick={this.handleFinishWork}>
                    <Icon name="stop" />
                    Finish work
                  </Button>
                </React.Fragment>
              )}
            </div>
          </div>
        </div>
        <div className="orders-in-process">
          <ul className="orders-in-process__list">
            {!orders ? (
              <Icon name="spinner" loading />
            ) : orders.length > 0 ? (
              orders.map(order => <OrderList activeOrder={order} key={order.id} />)
            ) : (
              <h2>No active orders</h2>
            )}
          </ul>
        </div>
      </main>
    )
  }
}

const mapStateToProps = state => {
  const orders = state.activeOrders
  const dayReport = state.dayReport
  const timeJournal = state.timeJournal
  const {email} = state.login

  return {
    orders,
    email,
    timeJournal,
    dayReport
  }
}

const mapDispatchToProps = dispatch => {
  return {
    getOrdersInProgress: values => dispatch(employeeActions.getOrdersInProgress(values)),
    saveStartTime: values => dispatch(employeeActions.saveStartTime(values)),
    saveFinishTime: values => dispatch(employeeActions.saveFinishTime(values)),
    getStartTime: values => dispatch(employeeActions.getStartTime(values))
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CookMain)
