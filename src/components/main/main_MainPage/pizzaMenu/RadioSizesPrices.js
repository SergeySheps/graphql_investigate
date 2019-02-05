import React from 'react'
import {Form, Radio, Label} from 'semantic-ui-react'
import {pizzaSizes, pizzaPrices} from '../../../../constants/constants'

export const RadioSizesPrices = props => {
  const {choosePizzaSize, stateCardField} = props

  const LabelSmallSize = () => (
    <Label size="large" color="olive" className="card-radio-form-item">
      {pizzaSizes.small} cm - {pizzaPrices.small} $
    </Label>
  )

  const LabelAverageSize = () => (
    <Label size="large" color="olive" className="card-radio-form-item">
      {pizzaSizes.average} cm - {pizzaPrices.average} $
    </Label>
  )
  
  const LabelBigSize = () => (
    <Label size="large" color="olive" className="card-radio-form-item">
      {pizzaSizes.big} cm - {pizzaPrices.big} $
    </Label>
  )

  return (
    <Form className="card-radio-form">
      <Form.Field>
        <Radio
          label={LabelSmallSize}
          name="pizza_size"
          value={{
            size: pizzaSizes.small,
            price: pizzaPrices.small
          }}
          checked={stateCardField.size === pizzaSizes.small || !stateCardField.size}
          onChange={choosePizzaSize}
        />
      </Form.Field>
      <Form.Field>
        <Radio
          label={LabelAverageSize}
          name="pizza_size"
          value={{
            size: pizzaSizes.average,
            price: pizzaPrices.average
          }}
          checked={stateCardField.size === pizzaSizes.average}
          onChange={choosePizzaSize}
        />
      </Form.Field>
      <Form.Field>
        <Radio
          label={LabelBigSize}
          name="pizza_size"
          value={{
            size: pizzaSizes.big,
            price: pizzaPrices.big
          }}
          checked={stateCardField.size === pizzaSizes.big}
          onChange={choosePizzaSize}
        />
      </Form.Field>
    </Form>
  )
}
