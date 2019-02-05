import React from 'react'
import {Form, Radio, Label} from 'semantic-ui-react'
import {pizzaSizes, pizzaSizeIndexes} from '../../../../constants/constants'

export const RadioGroupSizes = props => {
  const LabelSmallSize = () => <Label size="large">{pizzaSizes.small} cm</Label>
  const LabelAverageSize = () => <Label size="large">{pizzaSizes.average} cm</Label>
  const LabelBigSize = () => <Label size="large">{pizzaSizes.big} cm</Label>

  const {choosePizzaSize, statePizzaConstuctor} = props

  return (
    <Form className="pizza-constructor_sizes">
      <Form.Field>
        <Radio
          label={LabelSmallSize}
          name="pizza_size"
          value={pizzaSizeIndexes[pizzaSizes.small]}
          checked={statePizzaConstuctor.pizzaSizeIndex === pizzaSizeIndexes[pizzaSizes.small] || !statePizzaConstuctor.pizzaSizeIndex}
          onChange={choosePizzaSize}
        />
      </Form.Field>
      <Form.Field>
        <Radio
          label={LabelAverageSize}
          name="pizza_size"
          value={pizzaSizeIndexes[pizzaSizes.average]}
          checked={statePizzaConstuctor.pizzaSizeIndex === pizzaSizeIndexes[pizzaSizes.average]}
          onChange={choosePizzaSize}
        />
      </Form.Field>
      <Form.Field>
        <Radio
          label={LabelBigSize}
          name="pizza_size"
          value={pizzaSizeIndexes[pizzaSizes.big]}
          checked={statePizzaConstuctor.pizzaSizeIndex === pizzaSizeIndexes[pizzaSizes.big]}
          onChange={choosePizzaSize}
        />
      </Form.Field>
    </Form>
  )
}
