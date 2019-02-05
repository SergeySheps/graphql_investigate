import React from 'react'
import {Table} from 'semantic-ui-react'

const HistoryPizzasRow = props => {
  const {pizza} = props

  return (
    <Table.Row>
      <Table.Cell>{pizza.title}</Table.Cell>
      <Table.Cell>{pizza.size} cm</Table.Cell>
      <Table.Cell>x {pizza.amount}</Table.Cell>
      <Table.Cell>{pizza.total} $</Table.Cell>
    </Table.Row>
  )
}

export default HistoryPizzasRow
