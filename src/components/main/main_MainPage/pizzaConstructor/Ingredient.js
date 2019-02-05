import React from 'react'
import {Icon} from 'semantic-ui-react'

const Ingredient = props => {
  const {name, image, price} = props
  return (
    <li className="ingredient-list__ingredient">
      <img
        src={require(`../../../../static/${image}`)}
        alt="product_picture"
        className="ingredient-list__ingredient_image"
      />
      <div className="ingredient-list__ingredient-text-info">
        <div className="ingredient-list__ingredient-name">{name}</div>
        <div className="ingredient-list__ingredient-price">{price} $</div>
        <Icon name="minus" className="button-reduce-inrgedient" />
        <Icon name="plus" className="button-add-inrgedient" />
      </div>
    </li>
  )
}

export default Ingredient
