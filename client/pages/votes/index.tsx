import { NextPage } from 'next'
import Link from 'next/link'
import { LayoutGeneral } from '../../layout/general'
import { LayoutHeader } from '../../layout/header'
import { PageTitle } from '../../components/page-title'
import { AuthProvider, verify } from '../../services/auth'
import { getAllVotes } from '../../services/votes'
import { PageProps } from '../types'

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

const PageContent: NextPage<VotePageProps> = ({ votes }) => {
  return <div className="w-full h-full mx-auto">
    <PageTitle>Votes</PageTitle>
    <div className="mx-auto">
      { votes && votes.length ?
        <table className="table-auto">
          <thead>
            <tr>
              <th className="px-4 py-2">Title</th>
              <th className="px-4 py-2">Description</th>
              <th className="px-4 py-2">Lists</th>
            </tr>
          </thead>
          <tbody>
            { votes.map((vote: any) => {
              return <tr key={ vote._id }>
                <td className="border px-4 py-2">{ vote.title }</td>
                <td className="border px-4 py-2">{ vote.description }</td>
                <td className="border px-4 py-2">See list</td>
              </tr>
            })}
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
