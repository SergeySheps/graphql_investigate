import React from 'react'
import {Field, reduxForm} from 'redux-form'
import {Button} from 'semantic-ui-react'
import {renderTextInputField} from './inputComponents/inputComponents'
import {getPriceWithDiscount} from '../helpers/priceHelper'

const validate = values => {
  const errors = {}

  if (!values.houseNumber) {
    errors.houseNumber = 'Required'
  }
  if (!values.apartmentNumber) {
    errors.apartmentNumber = 'Required'
  }
  if (!values.street) {
    errors.street = 'Required'
  }
  if (!values.tel) {
    errors.tel = 'Required'
  }
  if (values.houseNumber < 1) {
    errors.houseNumber = 'House number must be greater than 0'
  }
  if (values.apartmentNumber < 1) {
    errors.apartmentNumber = 'Apartment number must be greater than 0'
  }

  return errors
}

const OrderForm = props => {
  const {handleSubmit, submitting, totalPrice} = props

  return (
    <form className="order__form" onSubmit={handleSubmit}>
      <h2 className="order-header-text">Order</h2>
      <Field name="street" type="text" component={renderTextInputField} label="Street" />
      <Field name="houseNumber" type="number" component={renderTextInputField} label="House number" />
      <Field name="apartmentNumber" type="number" component={renderTextInputField} label="Apartment number" />
      <Field name="tel" type="tel" component={renderTextInputField} label="Phone number" />
      <div className="total-price-with-discount">Total price with discount {getPriceWithDiscount(totalPrice)} $</div>
      <div className="order__form-item order__form-buttons">
        <Button type="submit" disabled={submitting} primary className="order__form-buttons-item">
          Order
        </Button>
      </div>
    </form>
  )
}

export default reduxForm({
  form: 'orderForm',
  validate
})(OrderForm)
