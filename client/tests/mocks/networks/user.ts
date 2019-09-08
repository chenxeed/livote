import { serverUrl } from '../../../services'
import { registerResponse, CONTENT_TYPE } from './fake-server'
import CONSTANTS from '../constants'

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
      token: 'newJWTforyou'
    })
  ]
)
