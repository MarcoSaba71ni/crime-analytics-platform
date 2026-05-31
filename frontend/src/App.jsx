import { useEffect } from "react"
import { useLocation } from "react-router-dom"
import Router from "./router/Router.jsx"

function App() {
  const location = useLocation()

  useEffect(() => {
    if (location.hash) {
      return
    }

    window.scrollTo({ top: 0, left: 0, behavior: "auto" })
  }, [location.pathname, location.search, location.hash])

  return (
    <div>
        <Router/>
    </div>
  )
}

export default App
