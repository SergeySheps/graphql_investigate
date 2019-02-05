import React from 'react'
import {Table, Checkbox} from 'semantic-ui-react'
import {connect} from 'react-redux'
import QueueIngredientsRow from './QueueIngredientsRow'
import {userActions} from '../../actions/userActions'

const QueueItem = props => {
  const {title, size, amount, ingredients, finishOrderDate} = props

  return (
    <Table.Row>
      <Table.Cell>{title}</Table.Cell>
      <Table.Cell>
        <Table textAlign="center" singleLine>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell>Title</Table.HeaderCell>
              <Table.HeaderCell>Amount</Table.HeaderCell>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            {ingredients.map((ingredient, ind) => (
              <QueueIngredientsRow ingredient={ingredient} key={ind} />
            ))}
          </Table.Body>
        </Table>
      </Table.Cell>
      <Table.Cell>x {amount}</Table.Cell>
      <Table.Cell>{size} cm</Table.Cell>
      <Table.Cell>
        {finishOrderDate ? (
          new Date(finishOrderDate).toLocaleString()
        ) : (
          <Checkbox toggle />
        )}
      </Table.Cell>
    </Table.Row>
  )
}

function mapDispatchToProps(dispatch) {
  return {
    submitPizzaOrder: values => dispatch(userActions.submitPizzaOrder(values)),
    addOrderToHistory: values => dispatch(userActions.addOrderToHistory(values))
  }
}

export default connect(
  null,
  mapDispatchToProps
)(QueueItem)
