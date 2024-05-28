import { Provider } from "jotai"
import { editorStore } from "../utils/store"
import { FC, ReactNode, useRef } from "react"
import tunnel from "tunnel-rat"
import { EditorCommandTunnelContext } from "./EditorCommand"



export const EditorRoot: FC<{ children: ReactNode }> = ({ children }) => {
  const tunnelInstance = useRef(tunnel()).current; 

  return (
    <Provider store={editorStore}>
      <EditorCommandTunnelContext.Provider value={tunnelInstance} >
        {children}
      </EditorCommandTunnelContext.Provider>
    </Provider>
  )
}