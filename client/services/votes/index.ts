import { tokenManager } from '@services/token'
import { NextPageContext } from 'next'
import { reqAllVotes, postCreateVote, CreateVoteData } from './api'

export const getAllVotes = async (ctx?: NextPageContext) => {
  const token = tokenManager.get(ctx)
  if (token) {
    const response = await reqAllVotes(token)
    const votes = response.data
    return votes
  } else {
    throw new Error('Authorization are not found')
  }
}

export const createVote = async (data: CreateVoteData, ctx?: NextPageContext) => {
  const token = tokenManager.get(ctx)
  if (token) {
    const response = await postCreateVote(token, data)
    return response
  } else {
    throw new Error('Authorization are not found')
  }
}