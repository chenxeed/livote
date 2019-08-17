import { FunctionComponent, useEffect } from 'react'
import { LayoutGeneral } from '../../layout/general'
import { LoginForm } from '../../components/login-form'
import { AuthProvider, useAuth } from '../../services/auth'

const Home: FunctionComponent = () => {

  return <AuthProvider>
    <LayoutGeneral>
      <HomeContent/>
    </LayoutGeneral>
  </AuthProvider>
}

const HomeContent: FunctionComponent = () => {
  const { user, isLogin, verify } = useAuth()

  useEffect(() => {
    void verify()
  }, [])

  return <div className="w-full h-full max-w-xs flex items-center mx-auto">
    { isLogin ? `Welcome, ${user.email}` : <LoginForm /> }
  </div>

}

export default Home