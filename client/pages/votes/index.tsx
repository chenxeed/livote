import { NextPage } from 'next'
import Link from 'next/link'
import { useState } from 'react'
import { LayoutGeneral } from '@layout/general'
import { LayoutHeader } from '@layout/header'
import { PageTitle } from '@components/page-title'
import { Button } from '@components/form'
import { AlertType, Alert, useAlert } from '@components/alert'
import { AuthProvider, verify } from '@services/auth'
import { useVoteState, getAllVotes, deleteVote } from '@services/votes'
import { PageProps } from '../types'
import { Vote } from '@rootTypes/vote'

interface VotePageProps extends PageProps {
  preloadVotes: Vote[]
}

const PageWrapper: NextPage<VotePageProps> = props => {

  return <AuthProvider context={{ user: props.user }}>
    <LayoutGeneral header={ <LayoutHeader/> }>
      <PageContent preloadVotes={ props.preloadVotes }/>
    </LayoutGeneral>
  </AuthProvider>
}

const PageContent: NextPage<VotePageProps> = ({ preloadVotes }) => {

  const {alertMessage, setAlertMessage} = useAlert()
  const [viewList, setViewList] = useState<Vote['_id'] | undefined>(undefined)
  const [votes, dispatchVotes] = useVoteState(preloadVotes)

  function showVoteList (voteId: Vote['_id']) {
    setViewList(viewList === voteId ? undefined : voteId)
  }

  async function clickDeleteVote (voteId: Vote['_id'], voteTitle: Vote['title']) {
    await deleteVote(voteId)
    dispatchVotes({
      type: 'delete',
      id: voteId
    })
    setAlertMessage([true, AlertType.SUCCESS, `Vote "${voteTitle}" deleted successfully`])
  }

  return <div className="w-full h-full">
    <PageTitle>Votes</PageTitle>
    <div className="mb-6">
      { alertMessage[0] && <Alert type={ alertMessage[1] }>{ alertMessage[2] }</Alert> }
    </div>
    <div className="container mx-auto">
      { votes && votes.length ?
        <table className="table-auto w-full">
          <thead>
            <tr>
              <th className="px-4 py-2">Title</th>
              <th className="px-4 py-2">Description</th>
              <th className="px-4 py-2">Lists</th>
            </tr>
          </thead>
          <tbody>
            { votes.map((vote) => {
              const voteColumn = [
                <tr key={ vote._id }>
                  <td className="border px-4 py-2">{ vote.title }</td>
                  <td className="border px-4 py-2">{ vote.description }</td>
                  <td className="border px-4 py-2 flex justify-center">
                    <Button className="mx-2" onClick={ () => showVoteList(vote._id) }>
                      { viewList === vote._id ? `Hide List` : `Show List` }
                    </Button>
                    <Link href={ `/votes/update/${vote._id}` }>
                      <Button className="mx-2">
                        Update
                      </Button>
                    </Link>
                    <Button className="mx-2" onClick={ () => clickDeleteVote(vote._id, vote.title) }>
                      Delete
                    </Button>
                  </td>
                </tr>
              ]
              if (viewList === vote._id) {
                if (vote.lists.length) {
                  vote.lists.forEach(list => {
                    voteColumn.push(
                      <tr className="bg-gray-100" key={ list._id }>
                        <td className="border px-4 py-2">{ list.title }</td>
                        <td className="border px-4 py-2">{ list.description }</td>
                        <td></td>
                      </tr>
                    )
                  })  
                } else {
                  voteColumn.push(
                    <tr className="bg-gray-100" key="empty-vote-list">
                      <td className="text-center" colSpan={3}>Vote List empty</td>
                    </tr>
                  )
                }
              }
              return voteColumn
            })}
            <tr>
              <td colSpan={ 3 }>
                <Link href="/votes/create"><Button>+</Button></Link>
              </td>
            </tr>
          </tbody>
        </table>
      :
        <div className="text-center">No votes yet, please <Link href="/votes/add"><a>create one</a></Link></div>
      }
    </div>
  </div>

}

PageWrapper.getInitialProps = async (ctx): Promise<VotePageProps> => {
  const checkAuth = await verify(ctx)
  const votes = await getAllVotes(ctx)
  return {
    user: checkAuth ? checkAuth.user : undefined,
    preloadVotes: votes
  }
}

export default PageWrapper
