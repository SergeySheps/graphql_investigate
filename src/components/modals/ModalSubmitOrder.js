import React, {Component} from 'react'
import {Button, Icon, Modal} from 'semantic-ui-react'
import OrderForm from '../OrderForm'
import {connect} from 'react-redux'
import {userActions} from '../../actions/userActions'
import {toastrNotification} from '../../helpers/toastrHelper'
import {toastrNotificationData} from '../../constants/constants'
import {getPriceWithDiscount} from '../../helpers/priceHelper'

class ModalSubmitOrder extends Component {
  componentWillUpdate(nextProps, nextState) {
    const {hasSuccessOrder, handleCloseModal} = this.props
    const isOpenModals = false

    if (hasSuccessOrder !== nextProps.hasSuccessOrder) {
      handleCloseModal(isOpenModals)

      nextProps.hasSuccessOrder
        ? toastrNotification('success', toastrNotificationData.orderSuccess, {
            position: 'bottom-right'
          })
        : toastrNotification('error', toastrNotificationData.orderError, {
            position: 'bottom-right'
          })
    }
  }

  calculateTotalPrice = basket => {
    return getPriceWithDiscount(basket.reduce((prev, curr) => prev + curr.total, 0))
  }

  handleSubmitOrder = values => {
    const {submitPizzaOrder, basket, email} = this.props
    const orderData = {
      userData: values,
      pizzaData: basket,
      email,
      totalPrice: this.calculateTotalPrice(basket)
    }

    return submitPizzaOrder(orderData)
  }

  render() {
    const {basket, handleOpacityMainModal} = this.props

    return (
      <Modal
        size="mini"
        closeIcon
        onClose={() => handleOpacityMainModal()}
        trigger={
          <Button primary icon onClick={() => handleOpacityMainModal()}>
            Proceed <Icon name="right chevron" />
          </Button>
        }>
        <Modal.Header>
          <Icon name="car" />
          Delivery form
        </Modal.Header>
        <Modal.Content>
          <OrderForm
            onSubmit={values => this.handleSubmitOrder(values)}
            totalPrice={this.calculateTotalPrice(basket)}
          />
        </Modal.Content>
      </Modal>
    )
  }
}

function mapStateToProps(state) {
  const basket = state.basket
  const {email} = state.login
  const {hasSuccessOrder} = state.order

  return {
    basket,
    email,
    hasSuccessOrder
  }
}

function mapDispatchToProps(dispatch) {
  return {
    submitPizzaOrder: values => dispatch(userActions.submitPizzaOrder(values))
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ModalSubmitOrder)
