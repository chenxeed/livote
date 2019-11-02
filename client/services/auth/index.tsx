import { createContext, useContext, useState, FunctionComponent, Dispatch, SetStateAction } from 'react'
import { NextPageContext } from 'next'
import Router from 'next/router'
import { reqLogin, reqVerify, reqSignUp } from './api'
import { tokenManager } from '../token'

export interface UserData {
  email: string
}

interface AuthContextValue {
  user: UserData,
  setUser?: Dispatch<SetStateAction<UserData>>
}

interface LoginProps {
  email: string;
  password: string;
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

  async function login ({ email, password }: LoginProps) {
    const response = await reqLogin({ email, password })
    const token = response.data.token
    tokenManager.set(token)
    setUser && setUser({
      ...user,
      email
    })
  }

  async function signup ({ email, password }: LoginProps) {
    await reqSignUp({ email, password })
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
