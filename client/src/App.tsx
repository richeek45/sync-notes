import DocEditor from './components/Editor'
import SideNavbar from './components/SideNavbar'
import './App.css'

function App() {

  return (
    <div className="grid min-h-screen w-full overflow-hidden lg:grid-cols-[280px_1fr]">
      <SideNavbar />
      <div style={{ width: '80vw', height: '80vh'}}>
        <DocEditor />
      </div>
    </div>
  )
}

export default App
