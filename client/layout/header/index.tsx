import { FunctionComponent, useState, Fragment } from 'react'
import Link from 'next/link'
import { useAuth } from '../../services/auth'

export const LayoutHeader: FunctionComponent = () => {
  const { user, isLogin, logout } = useAuth()

  const [showMenu, setShowMenu] = useState(false)

  const toggleMenu = (show?: boolean) => {
    const toShow = show === undefined ? !showMenu : show
    setShowMenu(toShow)
  }

  return <nav className="sticky top-0 z-20 flex items-center justify-between shadow flex-wrap bg-gray-100 p-6">
  <Link href='/'>
    <div className="flex items-center flex-shrink-0 mr-6 cursor-pointer">
      <span className="font-semibold text-xl tracking-tight">Livote</span>
    </div>
  </Link>
  <div className="block lg:hidden">
    <button
      className="flex items-center px-3 py-2 border rounded"
      onClick={ () => toggleMenu() }
      >
      <svg className="fill-current h-3 w-3" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
        <title>Menu</title>
        <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z"/>
      </svg>
    </button>
  </div>
  <div className={ `w-full block ${ showMenu ? '' : 'hidden' } flex-grow lg:flex lg:items-center lg:w-auto` }>
    <div className="text-sm lg:flex-grow">
      { isLogin
        ? <Fragment>
            <Link href="/votes">
              <a className="block mt-4 lg:inline-block lg:mt-0 mr-4">
                Votes
              </a>
            </Link>
            <button
              className="block mt-4 lg:inline-block lg:mt-0"
              onClick={ logout }>
              Logout
            </button>
          </Fragment> 
      : <Link href="/">
          <a className="block mt-4 lg:inline-block lg:mt-0 mr-4">
            Login
          </a>
        </Link>
      }
    </div>
    <div>
      { isLogin &&
        <span className="inline-block text-sm px-4 py-2 leading-none border rounded hover:border-transparent mt-4 lg:mt-0">
          { user.email }
        </span>
      }
    </div>
  </div>
</nav>
  }
