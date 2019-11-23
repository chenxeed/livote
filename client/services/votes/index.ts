import { tokenManager } from '@services/token'
import { NextPageContext } from 'next'
import axios from 'axios'
import { serverUrl } from '..'
import { Vote } from '@rootTypes/vote'

interface CreateVoteData {
  title: Vote['title'],
  description: Vote['description'],
  lists: Vote['lists']
}

export const getAllVotes = async (ctx?: NextPageContext) => {
  const token = tokenManager.get(ctx)
  if (token) {
    const response = await axios.request<Vote[]>({
      method: 'GET',
      url: `${serverUrl}/vote/all`,
      responseType: 'json',
      headers: {
        'content-type': 'application/json',
        'authorization': token
      }
    })
    const votes = response.data
    return votes
  } else {
    throw new Error('Authorization are not found')
  }
}

export const createVote = async (data: CreateVoteData, ctx?: NextPageContext) => {
  const token = tokenManager.get(ctx)
  if (token) {
    const response = await axios.request({
      method: 'POST',
      url: `${serverUrl}/vote/create`,
      responseType: 'json',
      headers: {
        'content-type': 'application/json',
        'authorization': token
      },
      data
    })
    return response
  } else {
    throw new Error('Authorization are not found')
  }
}
