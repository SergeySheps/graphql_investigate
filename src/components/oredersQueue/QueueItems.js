import React, {Component} from 'react'
import {Table} from 'semantic-ui-react'
import QueueItem from './QueueItem'
import {connect} from 'react-redux'
import '../../styles/history.css'

class QueueItems extends Component {
  render() {
    const {queue, isCookHistory, finishOrderDate} = this.props

    return (
      <Table fixed textAlign="center">
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>Title</Table.HeaderCell>
            <Table.HeaderCell>Ingredients</Table.HeaderCell>
            <Table.HeaderCell>Amount</Table.HeaderCell>
            <Table.HeaderCell>Size</Table.HeaderCell>
            {!isCookHistory ? (
              <Table.HeaderCell />
            ) : (
              <Table.HeaderCell>Finish date</Table.HeaderCell>
            )}
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {queue.length > 0
            ? queue.map((item, ind) => (
                <QueueItem
                  {...item}
                  key={item.id || ind}
                  finishOrderDate={finishOrderDate}
                />
              ))
            : ''}
        </Table.Body>
      </Table>
    )
  }
}

const mapStateToProps = (state, ownProps) => {
  const queue = ownProps.queue

  return {
    queue
  }
}

export default connect(mapStateToProps)(QueueItems)
