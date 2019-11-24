import { tokenManager } from '@services/token'
import { NextPageContext } from 'next'
import axios from 'axios'
import { serverUrl } from '..'
import { Vote } from '@rootTypes/vote'
import { useReducer } from 'react'

interface CreateVoteData {
  title: Vote['title'],
  description: Vote['description'],
  lists: Vote['lists']
}

type VoteAction =
  | { type: 'init', votes: Vote[] }
  | { type: 'add', vote: Vote }
  | { type: 'delete', id: Vote['_id'] }

export const useVoteState = (initialState: Vote[]) => {
  const reducer = (state: Vote[], action: VoteAction) => {
    switch(action.type) {
      case 'init': {
        return action.votes
      }
      case 'add': {
        return [
          ...state,
          action.vote
        ]
      }
      case 'delete': {
        return state.filter(vote => vote._id !== action.id)
      }
    }
  }
  return useReducer(reducer, initialState)
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

export const deleteVote = async (id: Vote['_id'], ctx?: NextPageContext) => {
  const token = tokenManager.get(ctx)
  if (token) {
    const response = await axios.request({
      method: 'DELETE',
      url: `${serverUrl}/vote/delete`,
      responseType: 'json',
      headers: {
        'content-type': 'application/json',
        'authorization': token
      },
      data: {
        id
      }
    })
    return response
  } else {
    throw new Error('Authorization are not found')
  }
}
