import {
  coefficientPrice,
  discountPercent,
  minDiscountOrderPrice
} from '../constants/constants'

const refreshAddedIngredients = (addedIngredients, products) =>
  addedIngredients.map(addedIngredient => {
    const updatedBasePrice = products.find(
      ingredient => ingredient.name === addedIngredient.name
    ).price

    return {
      ...addedIngredient,
      basePrice: updatedBasePrice,
      price: updatedBasePrice * addedIngredient.amount
    }
  })

const getProductsWithUpdatedPrice = (products, pizzaSizeIndex, nextPizzaSizeIndex) =>
  products.map(product => {
    const newPriceIngredient = Object.assign({}, product)
    const coefficientDifferencePrice = Math.abs(nextPizzaSizeIndex - pizzaSizeIndex)

    nextPizzaSizeIndex > pizzaSizeIndex
      ? (newPriceIngredient.price += coefficientDifferencePrice * coefficientPrice)
      : (newPriceIngredient.price -= coefficientDifferencePrice * coefficientPrice)

    return newPriceIngredient
  })

const updateSameIngredient = (addedIngredients, repeatingIngredient) =>
  addedIngredients.map(
    ingredient =>
      ingredient.name === repeatingIngredient.name
        ? {
            ...ingredient,
            amount: ingredient.amount + 1,
            price: ingredient.basePrice * (ingredient.amount + 1)
          }
        : ingredient
  )

const reduceIngredient = (addedIngredients, ingredient) =>
  addedIngredients
    .map(
      ingred =>
        ingred.name === ingredient.name
          ? {
              ...ingred,
              amount: ingred.amount > 0 ? ingred.amount - 1 : ingred.amount,
              price:
                ingred.basePrice * (ingred.amount > 0 ? ingred.amount - 1 : ingred.amount)
            }
          : ingred
    )
    .filter(item => item.amount > 0)

const getPriceWithDiscount = price => {
  return Number(
    String(
      price >= minDiscountOrderPrice ? price - (discountPercent * price) / 100 : price
    ).slice(0, 5)
  )
}

export {
  refreshAddedIngredients,
  getProductsWithUpdatedPrice,
  updateSameIngredient,
  reduceIngredient,
  getPriceWithDiscount
}
