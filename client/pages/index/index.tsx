import { FunctionComponent } from 'react'
import { LayoutGeneral } from '../../layout/general'
import { LoginForm } from '../../components/login-form'

export const Home: FunctionComponent = () => {
  return <LayoutGeneral>
    <div className="w-full h-full max-w-xs flex items-center mx-auto">
      <LoginForm />
    </div>
  </LayoutGeneral>
}

export default Home