import './style.scss'

function LayoutGeneral() {
  return <div className="container mx-auto">
    <header className="sticky">
      <div className="block md:inline-block md:w-1/4 text-center">
        Livote
      </div>
      <div className="block md:inline-block md:w-3/4">
        <nav className="flex">
          <div className="flex-1 text-center px-4 py-2 m-2">
          <button className="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded">
            Login
          </button>
          </div>
        </nav>
      </div>
    </header>
  </div>
}

export default LayoutGeneral
