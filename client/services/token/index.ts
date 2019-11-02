import nextCookie from 'next-cookies'
import cookie from 'js-cookie'
import { NextPageContext } from 'next'
import { authTokenKey } from '../'

/**
 * tokenManager
 * 
 * Manage token from cookies and its secret key
 * */
export const tokenManager = {
  get (ctx?: NextPageContext) {
    if (ctx && !!ctx.req) {
      return nextCookie(ctx)[authTokenKey]
    } else {
      return cookie.get(authTokenKey)
    }
  },
  set (token: string) {
    cookie.set(authTokenKey, token, {
      expires: 1
    })
  },
  clear () {
    cookie.remove(authTokenKey)
  }
}