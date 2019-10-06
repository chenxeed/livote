import { createContext, useContext, useState, FunctionComponent, Dispatch, SetStateAction } from 'react'
import { NextPageContext } from 'next'
import nextCookie from 'next-cookies'
import cookie from 'js-cookie'
import { reqLogin, reqVerify, reqSignUp } from './api'
import { authTokenKey } from '../'

export interface UserData {
  email: string
}

interface AuthContextValue {
  user: UserData,
  setUser: Dispatch<SetStateAction<UserData>> | null
}

interface LoginProps {
  email: string;
  password: string;
}

const AuthContext = createContext<AuthContextValue>({
  user: {
    email: ''
  },
  setUser: null
})

export const AuthProvider: FunctionComponent = ({
  children
}) => {
  const [user, setUser] = useState({
    email: ''
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

  async function login ({ email, password }: LoginProps) {
    const response = await reqLogin({ email, password })
    const token = response.data.token
    setToken(token)
    setUser && setUser({
      ...user,
      email
    })
  }

  async function signup ({ email, password }: LoginProps) {
    await reqSignUp({ email, password })
  }

  async function postVerify (user: UserData) {
    setUser && setUser(user)
  }

  async function logout () {
    // Based on this article, JWT token cannot be manually set to expire
    // on the server, so we just have to clear the client side authentication.
    // https://medium.com/devgorilla/how-to-log-out-when-using-jwt-a8c7823e8a6
    // Q: Why async function but nothing to await?
    // A: Just treating logout as a asynchronous process like login,
    // so it's easy to refactor later if logout needed to be async.
    clearToken()
    setUser && setUser({
      ...user,
      email: ''
    })
    return true
  }

  return {
    user,
    isLogin,
    login,
    signup,
    logout,
    postVerify
  }
}

export async function verify (ctx: NextPageContext) {
  const token = getToken(ctx)
  if (token) {
    try {
      const response = await reqVerify(token)
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

function setToken (token: string) {
  cookie.set(authTokenKey, token, {
    expires: 1
  })
}

function clearToken () {
  cookie.remove(authTokenKey)
}

function getToken (ctx: NextPageContext) {
  return nextCookie(ctx)[authTokenKey]
}
