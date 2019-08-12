import { serverUrl } from '../'
import axios from 'axios'

interface LoginProps {
  email: string;
  password: string;
}
export const submitLogin = ({ email, password }: LoginProps) => {
  return axios.post(`${serverUrl}/user/signin`, {
    email,
    password
  })
}