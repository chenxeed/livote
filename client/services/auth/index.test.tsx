import { FunctionComponent } from 'react'
import { render } from 'react-dom'
import { act } from 'react-dom/test-utils'
import flushPromises from 'flush-promises'
import CONSTANT from '../../tests/mocks/constants' 
import { AuthProvider, useAuth } from '.'

describe('ServiceAuth', () => {

  it('should be able to login and get user detail', async done => {
    // SETUP
    // prepare the child component as the consumer of AuthProvider
    const testAuth = {
      email: CONSTANT.email,
      password: CONSTANT.password
    }
    const Child: FunctionComponent = () => {
      const { user, login } = useAuth()
      const doLogin = () => {
        login(testAuth)
      }
      return <div>
        <div id="user">{JSON.stringify(user)}</div>
        <button id="login" onClick={ doLogin } >Login</button>
      </div>
    }
    const container = document.createElement('div')
    document.body.appendChild(container)
    // ACTION
    // render the component
    act(() => {
      render(
        <AuthProvider>
          <Child/>
        </AuthProvider>
      , container)
    })
    // ASSERT
    // check if the user email is empty first
    const user = container.querySelector('#user')
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
    expect(user && user.innerHTML).toEqual(JSON.stringify({
      email: testAuth.email
    }))

    done()
  })

  it('should be able to verify and success if there is token session', async done => {
    // SETUP
    // prepare the child component as the consumer of AuthProvider
    const Child: FunctionComponent = () => {
      const { user, verify } = useAuth()
      const doVerify = () => {
        verify()
      }
      return <div>
        <div id="user">{JSON.stringify(user)}</div>
        <button id="verify" onClick={ doVerify } >Verify</button>
      </div>
    }
    const container = document.createElement('div')
    document.body.appendChild(container)
    // mock sessionStorage used to store tokens
    sessionStorage.setItem('notsoobviousbutyouknowit', CONSTANT.authToken)
    // ACTION
    // render the component
    act(() => {
      render(
        <AuthProvider>
          <Child/>
        </AuthProvider>
      , container)
    })
    // ASSERT
    // check if the user email is empty first
    const user = container.querySelector('#user')
    expect(user && user.innerHTML).toEqual(JSON.stringify({
      email: ''
    }))
    // ACTION
    // trigger verify
    // note: There is TSlint error now, althought it was
    // suggested here to use `async callback` here:
    // https://reactjs.org/blog/2019/08/08/react-v16.9.0.html#async-act-for-testing
    // @ts-ignore
    await act(async () => {
      const verifyButton = container.querySelector<HTMLButtonElement>('#verify')
      verifyButton && verifyButton.dispatchEvent(new MouseEvent('click', {bubbles: true}))
    })
    await flushPromises()
    // ASSERT
    // check if the user logged-in and user data exist now
    expect(user && user.innerHTML).toEqual(JSON.stringify({
      email: CONSTANT.email
    }))

    // CLEANUP
    sessionStorage.clear()
    done()    
  })

})