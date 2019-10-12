import { NextPage } from 'next'
import Router from 'next/router'
import { useEffect } from 'react'
import { LayoutGeneral } from '../../layout/general'
import { LayoutHeader } from '../../layout/header'
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
  const { user, postVerify } = useAuth()

  useEffect(() => {
    if (props.user) {
      postVerify(props.user)
    }
  }, [])

  return <div className="w-full h-full max-w-xs flex items-center mx-auto">
    Hi {user.email}, You are in the votes page
  </div>

}

PageWrapper.getInitialProps = async (ctx): Promise<PageProps> => {
  const checkAuth = await verify(ctx)

  if (!checkAuth) {
    if (ctx.res) {
      ctx.res.writeHead(302, { Location: '/index' })
      ctx.res.end()
    } else {
      Router.push('/')
    }
    return {
      user: null
    }
  } else {
    return {
      user: checkAuth.user
    }  
  }
}

export default PageWrapper