import { tokenManager } from './'
import CONSTANT from '../../tests/constants'
import { authTokenKey } from '../'
import { NextPageContext } from 'next'
import cookie from 'js-cookie'

describe('Service - Token', () => {

  test('get within server environment', () => {
    // ARRANGE
    const ctx = {
      req: {},
      pathname: '',
      query: ''
    } as unknown as NextPageContext
    // ACTION
    const token = tokenManager.get(ctx)
    // ASSERT
    expect(token).toBe(CONSTANT.authToken)
  })

  test('get within client environment', () => {
    // ACTION
    // on client side environment, ctx doesn't exist
    const token = tokenManager.get()
    // ASSERT
    expect(token).toBe(CONSTANT.authToken)
  })

  test('set', () => {
    // ACTION
    tokenManager.set('something')
    // ASSERT
    expect(cookie.set).toBeCalledWith(authTokenKey, 'something', { expires: 1 })
  })

  test('clear', () => {
    // ACTION
    tokenManager.clear()
    // ASSERT
    expect(cookie.remove).toBeCalledWith(authTokenKey)
  })
})