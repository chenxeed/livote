import { serverUrl } from '../../../services'
import { registerResponse, CONTENT_TYPE } from './fake-server'

// user/login
registerResponse(
  {
    url: `${serverUrl}/user/signin`,
    method: 'POST',
    data: {
      email: 'test@email.com',
      password: '123456'
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
