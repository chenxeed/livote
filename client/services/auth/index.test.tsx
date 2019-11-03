import { FunctionComponent } from 'react'
import { render } from 'react-dom'
import { act } from 'react-dom/test-utils'
import flushPromises from 'flush-promises'
import CONSTANT from '../../tests/constants' 
import { AuthProvider, useAuth } from '.'

describe('Service - Auth', () => {

  test('login and get user detail', async done => {
    // SETUP
    // prepare the child component as the consumer of AuthProvider
    const testAuth = {
      email: CONSTANT.email,
      password: CONSTANT.password
    }
    const Child: FunctionComponent = () => {
      const { user, isLogin, login } = useAuth()
      const doLogin = () => {
        login(testAuth)
      }
      return <div>
        <div id="user">{JSON.stringify(user)}</div>
        <div id="isLogin">{ `${isLogin}` }</div>
        <button id="login" onClick={ doLogin } >Login</button>
      </div>
    }
    const container = document.createElement('div')
    document.body.appendChild(container)
    // ACTION
    // render the component
    act(() => {
      render(
        <AuthProvider context={{ user: undefined }}>
          <Child/>
        </AuthProvider>
      , container)
    })
    // ASSERT
    // check if the user email is empty first
    const user = container.querySelector('#user')
    const isLogin = container.querySelector('#isLogin')
    expect(user && user.innerHTML).toEqual(JSON.stringify({
      email: ''
    }))
    // ACTION
    // trigger login
    // note: There is TSlint error now, althought it was
    // suggested here to use `async callback` here:
    // https://reactjs.org/blog/2019/08/08/react-v16.9.0.html#async-act-for-testing
    // @ts-ignore
    await act(async () => {
      const loginButton = container.querySelector<HTMLButtonElement>('#login')
      loginButton && loginButton.dispatchEvent(new MouseEvent('click', {bubbles: true}))
    })
    await flushPromises()
    // ASSERT
    // check if the user logged-in and user data exist now
    expect(isLogin && isLogin.innerHTML).toBe("true")
    expect(user && user.innerHTML).toEqual(JSON.stringify({
      email: testAuth.email
    }))
    
    // CLEANUP
    done()
  })
})