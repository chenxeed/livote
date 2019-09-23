import { NextPage } from 'next'
import { useEffect } from 'react'
import { LayoutGeneral } from '../../layout/general'
import { LayoutHeader } from '../../layout/header'
import { LoginForm } from '../../components/login-form'
import { AuthProvider, useAuth, verify } from '../../services/auth'

interface HomePageProps {
  user: any
}
const PageWrapper: NextPage<HomePageProps> = props => {

  return <AuthProvider>
    <LayoutGeneral header={ <LayoutHeader/> }>
      <PageContent user={ props.user } />
    </LayoutGeneral>
  </AuthProvider>
}

const PageContent: NextPage<HomePageProps> = props => {
  const { user, isLogin, postVerify } = useAuth()

  useEffect(() => {
    if (props.user) {
      postVerify(props.user)
    }
  }, [])

  return <div className="w-full h-full max-w-xs flex items-center mx-auto">
    { isLogin
        ? <div className="rounded shadow px-6 py-4">
            <div className="text-md mb-2">
              Welcome, {` `} 
              <span className="font-bold">{ user.email }</span>.
              Please navigate from header menu.
            </div>
          </div>
        : <LoginForm />
    }
  </div>

}

PageWrapper.getInitialProps = async ctx => {
  const checkAuth = await verify(ctx)
  return {
    user: checkAuth ? checkAuth.user : null
  }
}

export default PageWrapper