const getLocalStorageItem = key => {
  return localStorage.getItem(key)
}

const setLocalStorageItem = (key, value) => {
  return localStorage.setItem(key, value)
}

export {getLocalStorageItem, setLocalStorageItem}
