import { NextPage } from 'next'
import { LayoutGeneral } from '@layout/general'
import { LayoutHeader } from '@layout/header'
import { PageTitle } from '@components/page-title'
import { InputText, InputTextarea, Button } from '@components/form'
import { AlertType, Alert } from '@components/alert'
import { AuthProvider, verify } from '@services/auth'
import { getAllVotes, createVote } from '@services/votes'
import { PageProps } from '../../types'
import { FormEvent, useState } from 'react'

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

  const [alertMessage, setAlertMessage] = useState<[boolean, AlertType, string]>([false, AlertType.INFO, ''])

  async function onSubmit (e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const elements = e.currentTarget.elements as unknown as HTMLInputElement[] | HTMLTextAreaElement[]
    const data = {
      title: elements[0].value,
      description: elements[1].value,
      lists: []
    }
    try {
      await createVote(data)
      setAlertMessage([true, AlertType.SUCCESS, 'Successfully created new vote!'])
    } catch (e) {
      const message = e.message || 'Failed to create new vote, please try again'
      setAlertMessage([true, AlertType.DANGER, message])
    }

  }

  return <div className="w-full h-full mx-auto">
    <PageTitle>Add New Vote</PageTitle>
    <div className="mx-auto max-w-lg">
      <div className="mb-6">
        { alertMessage[0] && <Alert type={ alertMessage[1] }>{ alertMessage[2] }</Alert> }
      </div>
      <form onSubmit={ onSubmit }>
        <InputText
          name="title"
          label="Title"/>
        <InputTextarea
          name="description"
          label="Description"/>
        <Button>Submit</Button>
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
