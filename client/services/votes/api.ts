import { serverUrl } from '..'
import axios from 'axios'

export const reqAllVotes = (token: string) => {
  return axios.request({
    method: 'GET',
    url: `${serverUrl}/vote/all`,
    responseType: 'json',
    headers: {
      'content-type': 'application/json',
      'authorization': token
    }
  })
}
