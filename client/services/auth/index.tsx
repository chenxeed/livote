import { serverUrl } from '..'
import axios from 'axios'
import { createContext, useContext, useState, FunctionComponent, Dispatch, SetStateAction } from 'react'

interface UserData {
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

const authTokenKey = 'notsoobviousbutyouknowit'

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
  const isLogin = user && user.email

  async function login ({ email, password }: LoginProps) {
    const response = await axios({
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
    setToken(token)
    setUser && setUser({
      email
    })
  }

  async function verify () {
    const token = getToken()
    try {
      const response = await axios({
        method: 'GET',
        url: `${serverUrl}/user/verify-auth`,
        responseType: 'json',
        headers: {
          'content-type': 'application/json',
          'authorization': token
        }
      })
      const user = response.data.user
      setUser && setUser({
        email: user.email
      })
      return true
    } catch (e) {
      setUser && setUser({
        email: ''
      })
      return false
    }
  }

  async function logout () {
    // Based on this article, JWT token cannot be manually set to expire
    // on the server, so we just have to clear the client side authentication.
    // https://medium.com/devgorilla/how-to-log-out-when-using-jwt-a8c7823e8a6
    clearToken()
    setUser && setUser({
      email: ''
    })
    return true
  }

  return {
    user,
    isLogin,
    login,
    logout,
    verify
  }
}

function setToken (token: string) {
  window.sessionStorage.setItem(authTokenKey, token)
}

function clearToken () {
  window.sessionStorage.removeItem(authTokenKey)
}

function getToken () {
  return window.sessionStorage.getItem(authTokenKey)
}