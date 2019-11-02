import { NextPage } from 'next'
import { LayoutGeneral } from '../../layout/general'
import { LayoutHeader } from '../../layout/header'
import { LoginForm } from '../../components/login-form'
import { AuthProvider, useAuth, verify } from '../../services/auth'
import { PageProps } from '../types'

const PageWrapper: NextPage<PageProps> = props => {

  return <AuthProvider context={{ user: props.user }}>
    <LayoutGeneral header={ <LayoutHeader/> }>
      <PageContent/>
    </LayoutGeneral>
  </AuthProvider>
}

const PageContent: NextPage = () => {
  const { user, isLogin } = useAuth()

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
    user: checkAuth ? checkAuth.user : undefined
  }
}

export default PageWrapper
