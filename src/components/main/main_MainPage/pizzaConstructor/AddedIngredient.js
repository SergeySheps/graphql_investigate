import React from 'react'

const Addedingredient = props => {
  const {name, price, amount} = props
  return (
    <React.Fragment>
      {amount > 0 && (
        <li className="added-ingredients-list-item">
          <div className="added-ingredients-list-item_amount">x{amount}</div>
          <div>{name}</div>
          <div>{price}$</div>
        </li>
      )}
    </React.Fragment>
  )
}

export default Addedingredient
