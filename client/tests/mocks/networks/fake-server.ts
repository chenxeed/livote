// init sinon fake server network
import sinon from 'sinon'
import { AxiosRequestConfig } from 'axios'

const fakeServer = sinon.fakeServer.create()
fakeServer.respondImmediately = true

export enum CONTENT_TYPE {
  JSON = 'application/json',
  SVG = 'image/svg+xml'
}
export interface ResponseHeader {
  'Content-Type': CONTENT_TYPE
}

type RespondPayload = [number, ResponseHeader?, string?]

const responseByUrl: Record<string, RespondPayload> = {}
export function registerResponse (request: AxiosRequestConfig, payload: RespondPayload) {
  const key = JSON.stringify(request)
  responseByUrl[key] = payload  
}

fakeServer.respondWith(request => {
  const axiosRequest: AxiosRequestConfig = {
    url: request.url,
    method: request.method as AxiosRequestConfig['method'],
  }
  if (request.requestBody) {
    axiosRequest.data = JSON.parse(request.requestBody)
  }
  // check authorization header if exist
  if (request.requestHeaders.authorization) {
    axiosRequest.headers = {
      authorization: request.requestHeaders.authorization
    }
  }
  const response = responseByUrl[JSON.stringify(axiosRequest)]
  
  if (response) {
    request.respond(response[0], response[1], response[2] || '')
  } else {
    request.respond(
      1337,
      { 'Content-Type': CONTENT_TYPE.JSON },
      `{message: 'Response not found'}`
    )
  }
})