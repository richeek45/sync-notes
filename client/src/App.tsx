import SideNavbar from './components/SideNavbar'
import './App.css'
import { EditorRoot } from './components/EditorRoot'
import { Outlet } from 'react-router-dom'

function App() {

  return (
    <div className="flex min-h-screen w-screen overflow-hidden">
      <EditorRoot>
        <SideNavbar />
        <Outlet />
      </EditorRoot>
    </div>
  )
}

export default App
