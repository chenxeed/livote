import { createContext, useContext, useState, FunctionComponent, Dispatch, SetStateAction } from 'react'
import { NextPageContext } from 'next'
import axios from 'axios'
import Router from 'next/router'
import { serverUrl } from '..'
import { tokenManager } from '../token'
import { User } from '@rootTypes/user'

interface SignUpParam {
  email: User['email'],
  password: User['password']
}
interface SignUpResponse {
  success: string
}
interface LoginParam {
  email: User['email'];
  password: User['password'];
}
interface LoginResponse {
  success: string,
  token: string
}
export interface UserData {
  email: User['email']
}
interface AuthContextValue {
  user: UserData,
  setUser?: Dispatch<SetStateAction<UserData>>
}
interface VerifyResponse {
  success: string;
  user: {
    email: string
  }
}

const AuthContext = createContext<AuthContextValue>({
  user: {
    email: ''
  },
  setUser: undefined
})

interface AuthProviderContext {
  context: {
    user?: UserData
  }
}
export const AuthProvider: FunctionComponent<AuthProviderContext> = ({
  children,
  context
}) => {
  const [user, setUser] = useState({
    email: (context.user && context.user.email) || ''
  })

  return <AuthContext.Provider value={{
    user,
    setUser
  }}>
    {children}
  </AuthContext.Provider>
}

export const useAuth = () => {
  const {user, setUser} = useContext(AuthContext)
  const isLogin = Boolean(user && user.email)

  async function login ({ email, password }: LoginParam) {
    const response = await axios.request<LoginResponse>({
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
    const token = response.data.token
    tokenManager.set(token)
    setUser && setUser({
      ...user,
      email
    })
  }

  async function signup ({ email, password }: SignUpParam) {
    await axios.request<SignUpResponse>({
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

  async function logout () {
    // Based on this article, JWT token cannot be manually set to expire
    // on the server, so we just have to clear the client side authentication.
    // https://medium.com/devgorilla/how-to-log-out-when-using-jwt-a8c7823e8a6
    // Q: Why async function but nothing to await?
    // A: Just treating logout as a asynchronous process like login,
    // so it's easy to refactor later if logout needed to be async.
    tokenManager.clear()
    setUser && setUser({
      ...user,
      email: ''
    })
    Router.push('/')
  }

  return {
    user,
    isLogin,
    login,
    signup,
    logout
  }
}

export async function verify (ctx?: NextPageContext) {
  const token = tokenManager.get(ctx)
  if (token) {
    try {
      const response = await axios.request<VerifyResponse>({
        method: 'GET',
        url: `${serverUrl}/user/verify-auth`,
        responseType: 'json',
        headers: {
          'content-type': 'application/json',
          'authorization': token
        }
      })
      const user = response.data.user
      return {
        user
      }
    } catch(e) {
      return false
    }
  } else {
    return false
  }
}
