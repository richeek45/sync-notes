import { useAtom, useSetAtom } from "jotai";
import { ComponentPropsWithRef, createContext, forwardRef, useEffect } from "react";
import type tunnel from "tunnel-rat";
import { editorStore } from "../utils/store";
import { queryAtom, rangeAtom } from "../utils/atoms";
import { FC } from "react";
import { Command } from "cmdk";
import { Range } from "@tiptap/core";

interface EditorCommandOutProps {
  readonly query: string;
  readonly range: Range;
}

export const EditorCommandTunnelContext = createContext({} as ReturnType<typeof tunnel>);

export const EditorCommandOut: FC<EditorCommandOutProps> = ({ query, range }) => {
  const setQuery = useSetAtom(queryAtom, { store: editorStore });
  const setRange = useSetAtom(rangeAtom, { store: editorStore });

  useEffect(() => {
    setQuery(query);
  }, [query, setQuery])

  useEffect(() => {
    setRange(range)
  }, [range, setRange])

  useEffect(() => {
    const navigationKeys = ["ArrowUp", "ArrowDown", "Enter"];

    const onKeyDown = (e: KeyboardEvent) => {
      if (navigationKeys.includes(e.key)) {
        e.preventDefault();
        const commandRef = document.querySelector("#slash-command");

        if (commandRef) {
          commandRef.dispatchEvent(
            new KeyboardEvent("keydown", {
              key: e.key,
              cancelable: true,
              bubbles: true,
            }),
          );
        }

        return false;
      }
    }

    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [])


  return (
    <EditorCommandTunnelContext.Consumer>
      {(tunnelInstance) => <tunnelInstance.Out/>}
    </EditorCommandTunnelContext.Consumer>
  )
}

export const EditorCommand = forwardRef<HTMLDivElement, ComponentPropsWithRef<typeof Command>>(
  ({ children, className, ...rest }, ref) => {
  const [query, setQuery] = useAtom(queryAtom);

  return (
    <EditorCommandTunnelContext.Consumer>
      {(tunnelInstance) => (
        <tunnelInstance.In>
            <Command
              ref={ref}
              onKeyDown={(e) => {
                e.stopPropagation();
              }}
              id="slash-command"
              className={className}
              {...rest}
            >
              <Command.Input value={query} onValueChange={setQuery} style={{ display: "none" }} />
              {children}
            </Command>
        </tunnelInstance.In>
      )}
    </EditorCommandTunnelContext.Consumer>
  )
})

EditorCommand.displayName = "EditorCommand";