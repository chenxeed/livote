import { serverUrl } from '..'
import axios from 'axios'
import { createContext, useContext, useState, FunctionComponent, Dispatch, SetStateAction } from 'react'

interface UserData {
  email: string
}

interface AuthContextValue {
  user: UserData | null,
  setUser: Dispatch<SetStateAction<UserData>> | null
}

interface LoginProps {
  email: string;
  password: string;
}

const authTokenKey = 'notsoobviousbutyouknowit'

export const AuthContext = createContext<AuthContextValue>({
  user: null,
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

  async function login ({ email, password }: LoginProps) {
    const response = await axios.post(`${serverUrl}/user/signin`, {
      email,
      password
    }, {
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
      const response = await axios.get(`${serverUrl}/user/verify-auth`, {
        headers: {
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

  return {
    user,
    login,
    verify
  }
}

function setToken (token: string) {
  window.sessionStorage.setItem(authTokenKey, token)
}

function getToken () {
  return window.sessionStorage.getItem(authTokenKey)
}