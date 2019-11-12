import { FunctionComponent, FormEvent, useState, SyntheticEvent, Fragment } from 'react'
import { useAuth } from '../../services/auth'
import { InputText, Button } from '../form'
import { Alert, AlertType } from '../alert'

enum Mode {
  LOGIN,
  SIGNUP
}

export const LoginForm: FunctionComponent = () => {
  
  const [alertMessage, setAlertMessage] = useState<[boolean, AlertType, string]>([false, AlertType.INFO, ''])
  const [mode, setMode] = useState(Mode.LOGIN)
  const { login, signup } = useAuth()

  async function onSubmitForm (e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    if (mode === Mode.LOGIN) {
      // reset the invalid flag on every new submit
      setAlertMessage([true, AlertType.INFO, 'Logging in, please wait...'])
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
        setAlertMessage([true, AlertType.DANGER, 'Login Failed'])
      }
    } else if (mode === Mode.SIGNUP) {
      // find the form values
      const target = e.currentTarget
      const emailForm = target.querySelector('input[name="email"]') as HTMLInputElement
      const passwordForm = target.querySelector('input[name="password"]') as HTMLInputElement
      const email = emailForm.value
      const password = passwordForm.value
      // reset the invalid flag on every new submit
      setAlertMessage([true, AlertType.INFO, `Submitting new account ${email}...`])
      // call the API to submit the login
      try {
        await signup({ email, password })
        changeMode(Mode.LOGIN)
        setAlertMessage([true, AlertType.SUCCESS, `${email} is registered!`])
      } catch (e) {
        setAlertMessage([true, AlertType.DANGER, 'Sign Up Failed'])
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
    setAlertMessage([false, AlertType.INFO, ''])
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
        { alertMessage[0] && <Alert type={ alertMessage[1] }>{ alertMessage[2] }</Alert> }
      </div>
      <div className="mb-4">
        <InputText
          label="Email"
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          name="email"
          id="loginEmail"
          type="email"
          placeholder="Your favourite e-mail"/>
      </div>
      <div className="mb-6">
        <InputText
          label="Password"
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
          name="password"
          id="loginPassword"
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
      { alertMessage[0] && <Alert type={ alertMessage[1] }>{ alertMessage[2] }</Alert> }
      </div>
      <div className="mb-4">
        <InputText
          label="Email"
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          name="email"
          id="signupEmail"
          type="email"
          placeholder="Your favourite e-mail"/>
      </div>
      <div className="mb-6">
        <InputText
          label="Password"
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
          name="password"
          id="signupPassword"
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
