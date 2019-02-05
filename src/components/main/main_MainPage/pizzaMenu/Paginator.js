import React from 'react'
import {Pagination} from 'semantic-ui-react'
import {defaultPagesCount} from '../../../../constants/constants'

const Paginator = ({handlePaginationChange, pages}) => {
  return (
    <Pagination
      defaultActivePage={1}
      firstItem={null}
      lastItem={null}
      pointing
      secondary
      totalPages={pages || defaultPagesCount}
      onPageChange={handlePaginationChange}
    />
  )
}

export default Paginator
