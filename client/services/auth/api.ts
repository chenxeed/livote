import { serverUrl } from '..'
import axios from 'axios'

interface LoginParam {
  email: string,
  password: string
}
export const reqLogin = ({ email, password }: LoginParam) => {
  return axios({
    method: 'POST',
    url: `${serverUrl}/user/signin`,
    data: {
      email,
      password
    },
    responseType: 'json',
    headers: {
      'content-type': 'application/json'
    }
  })
}

export const reqVerify = (token: string) => {
  return axios({
    method: 'GET',
    url: `${serverUrl}/user/verify-auth`,
    responseType: 'json',
    headers: {
      'content-type': 'application/json',
      'authorization': token
    }
  })  
}