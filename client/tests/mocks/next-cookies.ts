jest.mock('next-cookies', () => {
  const CONSTANT = require('../constants').default
  const { authTokenKey } = require('../../services/')
  const fakeToken = {
    [authTokenKey]: CONSTANT.authToken
  }
  
  return () => {
    return fakeToken
  }
})
export {}
