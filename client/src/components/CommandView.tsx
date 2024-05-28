import { Command } from "cmdk"
import { CustomBlockList } from "./BlockCommands"
import { useCurrentEditor } from "@tiptap/react";
import { Editor, Range } from "@tiptap/core";
import { EditorCommand } from "./EditorCommand";
import { useAtom, useAtomValue } from "jotai";
import { queryAtom, rangeAtom } from "../utils/atoms";

const CommandView = () => {
  const [value, setValue] = useAtom(queryAtom);
  const { editor } = useCurrentEditor();
  const range = useAtomValue(rangeAtom);

  return (
    <EditorCommand className="no-scrollbar w-full z-50 h-auto max-h-[330px] overflow-x-hidden overflow-y-auto rounded-md border bg-background px-1 py-2 shadow-lg drop-shadow	 transition-all">
      <Command.Input value={value} onValueChange={(search) => setValue(search)} style={{ display: "none" }} />
      <Command.Empty className="px-2 text-muted-foreground">No results</Command.Empty>
      <Command.List>
        {CustomBlockList.map((item) => (
          <Command.Item
            value={item.title}
            onSelect={() => item?.command({ editor: editor as Editor, range: range as Range })}
            className="flex w-full items-center ounded-md px-2 py-1 text-left text-sm hover:bg-accent aria-selected:bg-accent"
            key={item.title}
          >
            <div className="flex h-10 w-10 items-center justify-center rounded-md border border-muted bg-background">
              {item.icon}
            </div>
            <div className="m-1">
              <p className="font-medium m-0">{item.title}</p>
              <p className="text-xs text-muted-foreground m-0">{item.description}</p>
            </div>
          </Command.Item>
        ))}
      </Command.List>
  </EditorCommand>
  )
}

export default CommandView;