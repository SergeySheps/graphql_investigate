import React from 'react'
import {Table} from 'semantic-ui-react'

const QueueIngredientsRow = props => {
  const {ingredient} = props

  return (
    <Table.Row>
      <Table.Cell>{ingredient.name}</Table.Cell>
      <Table.Cell>x {ingredient.amount}</Table.Cell>
    </Table.Row>
  )
}

export default QueueIngredientsRow
