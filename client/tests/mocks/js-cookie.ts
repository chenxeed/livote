jest.mock('js-cookie', () => {
  const CONSTANT = require('../constants').default
  const { authTokenKey } = require('../../services/')
  return {
    get (key: string) {
      return key === authTokenKey ? CONSTANT.authToken : undefined
    },
    set : jest.fn(),
    remove: jest.fn()
  }
})
export {}
