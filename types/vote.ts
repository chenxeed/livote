import { User } from './user'

export interface Vote {
  _id: string,
  title: string,
  description: string,
  creator: User['_id'],
  lists: VoteList[]
}

export interface VoteList {
  _id: string,
  title: string,
  description: string
}

export interface Voter {
  voter: User['_id'],
  chosenList: VoteList['_id']
}
