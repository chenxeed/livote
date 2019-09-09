import { FunctionComponent, useEffect } from 'react'
import { LayoutGeneral } from '../../layout/general'
import { LoginForm } from '../../components/login-form'
import { AuthProvider, useAuth } from '../../services/auth'

const PageWrapper: FunctionComponent = () => {

  return <AuthProvider>
    <LayoutGeneral>
      <PageContent/>
    </LayoutGeneral>
  </AuthProvider>
}

const PageContent: FunctionComponent = () => {
  const { user, isLogin, verify } = useAuth()
  // Verify the user login on load
  useEffect(() => {
    verify()
  }, [])

  return <div className="w-full h-full max-w-xs flex items-center mx-auto">
    { isLogin
        ? <div className="rounded shadow px-6 py-4">
            <div className="text-md mb-2">
              Welcome, {` `} 
              <span className="font-bold">{ user.email }</span>
            </div>
            <ul className="flex">
              <li className="mr-6">
                <a
                  className="text-blue-500 hover:text-blue-800"
                  href="/votes">Votes</a>
              </li>
            </ul>
          </div>
        : <LoginForm />
    }
  </div>

}

export default PageWrapper