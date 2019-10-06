import { NextPage } from 'next'
import { useEffect } from 'react'
import { LayoutGeneral } from '../../layout/general'
import { LayoutHeader } from '../../layout/header'
import { LoginForm } from '../../components/login-form'
import { AuthProvider, useAuth, verify } from '../../services/auth'
import { PageProps } from '../types'

const PageWrapper: NextPage<PageProps> = props => {

  return <AuthProvider>
    <LayoutGeneral header={ <LayoutHeader/> }>
      <PageContent user={ props.user } />
    </LayoutGeneral>
  </AuthProvider>
}

const PageContent: NextPage<PageProps> = props => {
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

PageWrapper.getInitialProps = async (ctx): Promise<PageProps> => {
  const checkAuth = await verify(ctx)
  return {
    user: checkAuth ? checkAuth.user : null
  }
}

export default PageWrapper