import { tokenManager } from '../token'
import { NextPageContext } from 'next'
import { reqAllVotes } from './api'

export const getAllVotes = async (ctx?: NextPageContext) => {
  const token = tokenManager.get(ctx)
  if (token) {
    const response = await reqAllVotes(token)
    const votes = response.data.votes
    return votes
  } else {
    throw new Error('Authorization are not found')
  }
}