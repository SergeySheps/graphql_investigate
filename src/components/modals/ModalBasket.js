import React, {Component} from 'react'
import {Button, Modal, Icon} from 'semantic-ui-react'
import BasketItems from '../basket/BasketItems'
import {connect} from 'react-redux'
import ModalSubmitOrder from './ModalSubmitOrder'
import '../../styles/basket.css'

class ModalBasket extends Component {
  state = {
    opacity: 1,
    open: false
  }

  handleOpacityMainModal = () =>
    this.setState({
      opacity: this.state.opacity === 1 ? 0 : 1
    })

  handleCloseModal = isOpen =>
    this.setState({
      opacity: 1,
      open: isOpen
    })

  render() {
    const basket = JSON.parse(sessionStorage.getItem("basket"))||[]
    const {opacity} = this.state

    return (
      <div>
        <Modal
          dimmer="blurring"
          open={this.state.open}
          onClose={() => this.handleCloseModal(false)}
          trigger={
            <Button primary icon labelPosition="left" onClick={() => this.handleCloseModal(true)}>
              <Icon name="shopping basket" />
              Basket
            </Button>
          }
          style={{opacity: opacity}}
          size="large"
          closeIcon>
          <Modal.Header>
            <Icon name="shopping basket" /> Basket
          </Modal.Header>
          <Modal.Content scrolling className="modal-window__content">
            <div className="modal-window__text">
              <h2>We have a system of discounts!!!</h2>
              <h3>If you order more than 50$ you will get a discount 10%</h3>
            </div>
            {basket.length > 0 ? <BasketItems basket={basket} /> : <h2 className="modal-window__text">Basket is empty</h2>}
          </Modal.Content>
          <Modal.Actions>
            {basket.length > 0 ? (
              <ModalSubmitOrder
                handleOpacityMainModal={this.handleOpacityMainModal}
                handleCloseModal={this.handleCloseModal}
              />
            ) : (
              ''
            )}
          </Modal.Actions>
        </Modal>
      </div>
    )
  }
}

const mapStateToProps = state => {
  const basket = state.basket

  return {
    basket
  }
}

export default connect(mapStateToProps)(ModalBasket)
