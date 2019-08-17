import { FunctionComponent, FormEvent, useState } from 'react'
import { useAuth } from '../../services/auth'

export const LoginForm: FunctionComponent = () => {
  
  const [isInvalid, setIsInvalid] = useState(false)
  const { login } = useAuth()

  async function onSubmitForm (e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    // reset the invalid flag on every new submit
    setIsInvalid(false)
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
      setIsInvalid(true)
    }
  }

  return <form
    className="w-full bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
    onSubmit={ onSubmitForm }>
    <div className="mb-6">
      { isInvalid &&
        <span className="text-red-700">Login failed</span>    
      }
    </div>
    <div className="mb-4">
      <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="username">
        Email
      </label>
      <input
        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        name="email"
        type="text"
        placeholder="Your favourite e-mail"/>
    </div>
    <div className="mb-6">
      <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
        Password
      </label>
      <input
        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
        name="password"
        type="password"
        placeholder="******************"/>
    </div>
    <div className="flex items-center justify-between">
      <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
        Sign In
      </button>
      <span>
        <a
          className="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800"
          href="">
          Sign Up
        </a>
      </span>
    </div>
  </form>
}
