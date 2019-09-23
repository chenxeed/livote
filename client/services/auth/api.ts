import { serverUrl } from '..'
import axios from 'axios'

interface LoginParam {
  email: string,
  password: string
}
interface LoginResponse {
  success: string,
  token: string
}
export const reqLogin = ({ email, password }: LoginParam) => {
  return axios.request<LoginResponse>({
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

interface VerifyResponse {
  success: string;
  user: {
    email: string
  }
}
export const reqVerify = (token: string) => {
  const request = axios.request<VerifyResponse>({
    method: 'GET',
    url: `${serverUrl}/user/verify-auth`,
    responseType: 'json',
    headers: {
      'content-type': 'application/json',
      'authorization': token
    }
  })
  return request
}