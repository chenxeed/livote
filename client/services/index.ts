const serverHost = process.env.SERVER_HOST
const serverPort = process.env.SERVER_PORT
  ? `:${process.env.SERVER_PORT}`
  : ''
export const serverUrl = `${serverHost}${serverPort}`
export const authTokenKey = process.env.AUTH_TOKEN_KEY || 'defaultLivoteSecret'