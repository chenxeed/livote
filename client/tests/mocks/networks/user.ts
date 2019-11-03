import { serverUrl } from '../../../services'
import { registerResponse, CONTENT_TYPE } from './fake-server'
import CONSTANTS from '../../constants'

// user/signin
registerResponse(
  {
    url: `${serverUrl}/user/signin`,
    method: 'POST',
    data: {
      email: CONSTANTS.email,
      password: CONSTANTS.password
    }
  },
  [
    200,
    { 'Content-Type': CONTENT_TYPE.JSON },
    JSON.stringify({
      success: 'Authentication success',
      token: CONSTANTS.authToken
    })
  ]
)

// user/signup
registerResponse(
  {
    url: `${serverUrl}/user/signup`,
    method: 'POST',
    data: {
      email: CONSTANTS.email,
      password: CONSTANTS.password
    }
  },
  [
    200,
    { 'Content-Type': CONTENT_TYPE.JSON },
    JSON.stringify({
      success: 'New user has been created'
    })
  ]
)

// user/verify-auth
registerResponse(
  {
    url: `${serverUrl}/user/verify-auth`,
    method: 'GET',
    headers: {
      authorization: CONSTANTS.authToken
    }
  },
  [
    200,
    { 'Content-Type': CONTENT_TYPE.JSON },
    JSON.stringify({
      success: 'Authentication verified',
      user: {
        email: CONSTANTS.email
      }
    })
  ]
)