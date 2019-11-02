const serverHost = process.env.SERVER_HOST
const serverPort = process.env.SERVER_PORT
  ? `:${process.env.SERVER_PORT}`
  : ''
/**
 * Get the server API root URL based on the secret env
 */
export const serverUrl = `${serverHost}${serverPort}`

/**
 * Get the secret auth token key
 */
export const authTokenKey = process.env.AUTH_TOKEN_KEY || 'defaultLivoteSecret'