const checkRepeatingItem = (basket, item) => {
  const repeatingItem = basket.find(
    el =>
      el.title === item.title &&
      el.size === item.size &&
      el.ingredients.length === item.ingredients.length &&
      el.ingredients.every((v, i) => v === item.ingredients[i])
  )

  if (!repeatingItem) {
    return
  }

  return basket.map(el => {
    if (el === repeatingItem) {
      const newAmount = el.amount + 1

      return {...el, amount: newAmount, total: el.price * newAmount}
    }

    return el
  })
}

export {checkRepeatingItem}
