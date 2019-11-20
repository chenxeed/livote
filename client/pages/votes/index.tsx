import { NextPage } from 'next'
import Link from 'next/link'
import { useState } from 'react'
import { LayoutGeneral } from '@layout/general'
import { LayoutHeader } from '@layout/header'
import { PageTitle } from '@components/page-title'
import { Button } from '@components/form'
import { AuthProvider, verify } from '@services/auth'
import { getAllVotes } from '@services/votes'
import { PageProps } from '../types'
import { Vote } from '@rootTypes/vote'

interface VotePageProps extends PageProps {
  votes: Vote[]
}

const PageWrapper: NextPage<VotePageProps> = props => {

  return <AuthProvider context={{ user: props.user }}>
    <LayoutGeneral header={ <LayoutHeader/> }>
      <PageContent votes={ props.votes }/>
    </LayoutGeneral>
  </AuthProvider>
}

const PageContent: NextPage<VotePageProps> = ({ votes }) => {

  const [viewList, setViewList] = useState<Vote['_id'] | undefined>(undefined)

  function showVoteList (voteId: Vote['_id']) {
    setViewList(viewList === voteId ? undefined : voteId)
  }

  return <div className="w-full h-full">
    <PageTitle>Votes</PageTitle>
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
                  <td className="border px-4 py-2">
                    <Button onClick={ () => showVoteList(vote._id) }>
                      { viewList === vote._id ? `Hide List` : `Show List` }
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
                <Link href="/votes/add"><Button>+</Button></Link>
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
    votes
  }
}

export default PageWrapper
