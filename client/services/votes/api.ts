import { serverUrl } from '..'
import axios, { AxiosResponse } from 'axios'
import { Vote } from '@rootTypes/vote'

export const reqAllVotes = (token: string) => {
  return axios.request<any, AxiosResponse<Vote[]>>({
    method: 'GET',
    url: `${serverUrl}/vote/all`,
    responseType: 'json',
    headers: {
      'content-type': 'application/json',
      'authorization': token
    }
  })
}

export interface CreateVoteData {
  title: Vote['title'],
  description: Vote['description'],
  lists: Vote['lists']
}
export const postCreateVote = (token: string, data: CreateVoteData) => {
  return axios.request({
    method: 'POST',
    url: `${serverUrl}/vote/create`,
    responseType: 'json',
    headers: {
      'content-type': 'application/json',
      'authorization': token
    },
    data
  })
}
