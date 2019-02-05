import React, {Component} from 'react'
import {Table} from 'semantic-ui-react'
import HistoryItem from './HistoryItem'
import {connect} from 'react-redux'
import '../../styles/history.css'

class HistoryItems extends Component {
  render() {
    const {history} = this.props

    return (
      <Table textAlign="center">
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>Date</Table.HeaderCell>
            <Table.HeaderCell>Pizzas</Table.HeaderCell>
            <Table.HeaderCell>Delivery data</Table.HeaderCell>
            <Table.HeaderCell>Total price</Table.HeaderCell>
            <Table.HeaderCell />
          </Table.Row>
        </Table.Header>
        <Table.Body>{history.map(item => <HistoryItem {...item} key={item.id} />)}</Table.Body>
      </Table>
    )
  }
}

const mapStateToProps = (state, ownProps) => {
  const history = ownProps.history

  return {
    history
  }
}

export default connect(mapStateToProps)(HistoryItems)
