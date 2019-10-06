import { serverUrl } from '..'
import axios from 'axios'


interface SignUpParam {
  email: string,
  password: string
}
interface SignUpResponse {
  success: string
}
interface LoginParam {
  email: string,
  password: string
}
interface LoginResponse {
  success: string,
  token: string
}

export const reqSignUp = ({ email, password }: SignUpParam) => {
  return axios.request<SignUpResponse>({
    method: 'POST',
    url: `${serverUrl}/user/signup`,
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