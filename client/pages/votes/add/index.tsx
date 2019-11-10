import { NextPage } from 'next'
import { LayoutGeneral } from '../../../layout/general'
import { LayoutHeader } from '../../../layout/header'
import { PageTitle } from '../../../components/page-title'
import { InputText, InputTextarea } from '../../../components/form'
import { AuthProvider, verify } from '../../../services/auth'
import { getAllVotes } from '../../../services/votes'
import { PageProps } from '../../types'
import { FormEvent } from 'react'

interface VotePageProps extends PageProps {
  votes: any
}

const PageWrapper: NextPage<VotePageProps> = props => {

  return <AuthProvider context={{ user: props.user }}>
    <LayoutGeneral header={ <LayoutHeader/> }>
      <PageContent votes={ props.votes }/>
    </LayoutGeneral>
  </AuthProvider>
}

const PageContent: NextPage<VotePageProps> = () => {

  function onSubmit (e: FormEvent<HTMLFormElement>) {
    const form = e.currentTarget
    console.log(form)
  }

  return <div className="w-full h-full mx-auto">
    <PageTitle>Add New Vote</PageTitle>
    <div className="mx-auto max-w-lg">
      <form onSubmit={ onSubmit }>
        <InputText
          label="Title"/>
        <InputTextarea
          label="Description"/>
      </form>
    </div>
  </div>

}

PageWrapper.getInitialProps = async (ctx): Promise<VotePageProps> => {
  const checkAuth = await verify(ctx)
  const votes = await getAllVotes(ctx)
  return {
    user: checkAuth ? checkAuth.user : undefined,
    votes
  }
}

export default PageWrapper
