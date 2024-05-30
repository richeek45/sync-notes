import DocEditor from './components/Editor'
import SideNavbar from './components/SideNavbar'
import './App.css'

function App() {

  return (
    <div className="flex min-h-screen w-screen overflow-hidden">
      <SideNavbar />
      <div className="mx-2">
        <DocEditor />
      </div>
    </div>
  )
}

export default App
