import {getLocalStorageItem} from '../helpers/authorizationHelper'
import {apiConfig} from '../config/apiConfigs/apiConfig'

const handleResponse = response => {
  return response.text().then(text => {
    const data = text && JSON.parse(text)
    if (!response.ok) {
      const error = (data && data.message) || response.statusText
      return Promise.reject(error)
    }

    return data
  })
}

const postRequestWithoutToken = (url, data) => {
  const requestOptions = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  }

  return fetch(url, requestOptions).then(handleResponse)
}

const getRequestWithoutToken = url => {
  const requestOptions = {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json'
    }
  }

  return fetch(url, requestOptions).then(handleResponse)
}

const getRequestWithToken = url => {
  const requestOptions = {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'x-access-token': getLocalStorageItem('token')
    }
  }

  return fetch(url, requestOptions).then(handleResponse)
}

const postRequestWithToken = (url, data) => {
  const requestOptions = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'x-access-token': getLocalStorageItem('token')
    },
    body: JSON.stringify(data)
  }

  return fetch(url, requestOptions).then(handleResponse)
}

const putRequestWithToken = (url, data) => {
  const requestOptions = {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      'x-access-token': getLocalStorageItem('token')
    },
    body: JSON.stringify(data)
  }

  return fetch(url, requestOptions).then(handleResponse)
}

const deleteRequestWithToken = (url, data) => {
  const requestOptions = {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      'x-access-token': getLocalStorageItem('token')
    },
    body: JSON.stringify(data)
  }

  return fetch(url, requestOptions).then(handleResponse)
}

const graphqlRequestWithToken = (requestType, data) => {
  const requestOptions = {
    method: requestType,
    headers: {
      'Content-Type': 'application/json',
      'x-access-token': getLocalStorageItem('token')
    },
    body: JSON.stringify(data.body)
  }
  return fetch(
    `${apiConfig}/graphql${data.query ? data.query : ''}`,
    requestOptions
  ).then(res => res.json())
}

const getGraphqlRequestWithoutToken = query => {
  const requestOptions = {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json'
    }
  }

  return fetch(`${apiConfig.apiUrl}/graphql${query}`, requestOptions).then(res =>
    res.json()
  )
}

const postGraphqlRequestWithoutToken = data => {
  const requestOptions = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data.body)
  }

  return fetch(`${apiConfig.apiUrl}/graphql${data.query}`, requestOptions).then(res => res.json())
}

export default {
  postRequestWithToken,
  postRequestWithoutToken,
  getRequestWithoutToken,
  getRequestWithToken,
  putRequestWithToken,
  deleteRequestWithToken,
  postGraphqlRequestWithoutToken,
  getGraphqlRequestWithoutToken
}
