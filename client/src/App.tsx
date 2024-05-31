import DocEditor from './components/Editor'
import SideNavbar from './components/SideNavbar'
import './App.css'
import { EditorRoot } from './components/EditorRoot'

function App() {

  return (
    <div className="flex min-h-screen w-screen overflow-hidden">
    <EditorRoot>
      <SideNavbar />
      <div className="mx-2">
        <DocEditor />
      </div>
    </EditorRoot>
    </div>
  )
}

export default App
