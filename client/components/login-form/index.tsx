import { FunctionComponent, FormEvent, useState, SyntheticEvent, Fragment } from 'react'
import { useAuth } from '../../services/auth'
import { InputText, Button } from '../form'

enum Mode {
  LOGIN,
  SIGNUP
}

export const LoginForm: FunctionComponent = () => {
  
  const [isLoginInvalid, setIsLoginInvalid] = useState(false)
  const [isSignUpInvalid, setIsSignUpInvalid] = useState(false)
  const [mode, setMode] = useState(Mode.LOGIN)
  const { login, signup } = useAuth()

  async function onSubmitForm (e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    if (mode === Mode.LOGIN) {
      // reset the invalid flag on every new submit
      setIsLoginInvalid(false)
      // find the form values
      const target = e.currentTarget
      const emailForm = target.querySelector('input[name="email"]') as HTMLInputElement
      const passwordForm = target.querySelector('input[name="password"]') as HTMLInputElement
      const email = emailForm.value
      const password = passwordForm.value
      // call the API to submit the login
      try {
        await login({ email, password })
      } catch (e) {
        setIsLoginInvalid(true)
      }
    } else if (mode === Mode.SIGNUP) {
      // reset the invalid flag on every new submit
      setIsSignUpInvalid(false)
      // find the form values
      const target = e.currentTarget
      const emailForm = target.querySelector('input[name="email"]') as HTMLInputElement
      const passwordForm = target.querySelector('input[name="password"]') as HTMLInputElement
      const email = emailForm.value
      const password = passwordForm.value
      // call the API to submit the login
      try {
        await signup({ email, password })
      } catch (e) {
        setIsSignUpInvalid(true)
      }      
    }

  }

  function clickNavSignUp (e: SyntheticEvent) {
    e.preventDefault()
    changeMode(Mode.SIGNUP)
  }

  function clickNavLogin (e: SyntheticEvent) {
    e.preventDefault()
    changeMode(Mode.LOGIN)
  }

  function changeMode (mode: Mode) {
    setMode(mode)
  }

  return <form
    className="w-full bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
    onSubmit={ onSubmitForm }>
    { mode === Mode.LOGIN &&
    <Fragment>
      <div className="mb-6 text-center">
        <h3>Log In</h3>
      </div>
      <div className="mb-6">
        { isLoginInvalid &&
          <span className="text-red-700">Login failed</span>    
        }
      </div>
      <div className="mb-4">
        <InputText
          label="Email"
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          name="email"
          type="email"
          placeholder="Your favourite e-mail"/>
      </div>
      <div className="mb-6">
        <InputText
          label="Password"
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
          name="password"
          type="password"
          placeholder="******************"/>
      </div>
      <div className="flex items-center justify-between">
        <Button type="submit">Sign In</Button>
        <span>
          <a
            className="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800"
            onClick={ clickNavSignUp }>
            Sign Up
          </a>
        </span>
      </div>
    </Fragment> }

    { mode === Mode.SIGNUP &&
    <Fragment>
      <div className="mb-6 text-center">
        <h3>Sign Up</h3>
      </div>
      <div className="mb-6">
        { isSignUpInvalid &&
          <span className="text-red-700">Sign Up failed</span>    
        }
      </div>
      <div className="mb-4">
        <InputText
          label="Email"
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          name="email"
          type="email"
          placeholder="Your favourite e-mail"/>
      </div>
      <div className="mb-6">
        <InputText
          label="Password"
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
          name="password"
          type="password"
          placeholder="******************"/>
      </div>
      <div className="flex items-center justify-between">
        <Button type="submit">Sign Up</Button>
        <span>
          <a
            className="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800"
            onClick={ clickNavLogin }>
            Login
          </a>
        </span>
      </div>
    </Fragment> }
  </form>
}
