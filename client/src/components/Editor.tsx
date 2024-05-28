import { EditorProvider, BubbleMenu, useCurrentEditor, Range, JSONContent } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import { Color } from '@tiptap/extension-color'
import ListItem from '@tiptap/extension-list-item'
import TextStyle from '@tiptap/extension-text-style'
import Document from '@tiptap/extension-document'
import Paragraph from '@tiptap/extension-paragraph'
import Text from '@tiptap/extension-text'
import { TaskItem } from "@tiptap/extension-task-item";
import { TaskList } from "@tiptap/extension-task-list";
import Collaboration from '@tiptap/extension-collaboration';
import CollaborationCursor from '@tiptap/extension-collaboration-cursor'
import Placeholder from '@tiptap/extension-placeholder'
import { v4 as uuid } from 'uuid';
import * as Y from "yjs";
import { HocuspocusProvider } from '@hocuspocus/provider';
import { CustomBlockCommand, CustomBlockList, renderItems } from './BlockCommands'
import CommandView from './CommandView'
import { EditorRoot } from './EditorRoot'
import { useAtomValue } from 'jotai'
import { rangeAtom } from '../utils/atoms'
import { useState } from 'react'
import { cn } from '../lib/utils'

const ydoc = new Y.Doc();
const provider = new HocuspocusProvider({
  url: "ws://127.0.0.1:8080",
  name: "events",
  document: ydoc,
  connect: true,
  onOpen: () => {
    console.log('websocket connection is created!!')
  },
  onStatus(data) {
    console.log(data.status)
  },
  // onAwarenessUpdate: ({ states }) => {
  //   console.log(states);
  // },
});


const randomColor = () => {
  return `rgb(${Math.random() * 255} ${Math.random() * 255} ${Math.random() * 255})`;
}

const handleCommandNavigation = (event: KeyboardEvent) => {
  if (["ArrowUp", "ArrowDown", "Enter"].includes(event.key)) {
    const slashCommand = document.querySelector("#slash-command");
    if (slashCommand) {
      return true;
    }
  }
};

const editorProps = {
  attributes: {
    className: 'prose prose-sm sm:prose lg:prose-lg xl:prose-2xl mx-auto focus:outline-none',
  },
  handleDOMEvents: {
    keydown: (_view: unknown, event: KeyboardEvent) => handleCommandNavigation(event),
  },
  transformPastedText(text: string) {
    return text.toUpperCase()
  }
}

const content = `
<h2>
  Hi there,
</h2>
<p>
  this is a <em>basic</em> example of <strong>tiptap</strong>. Sure, there are all kind of basic text styles you’d probably expect from a text editor. But wait until you see the lists:
</p>
<ul>
  <li>
    That’s a bullet list with one …
  </li>
  <li>
    … or two list items.
  </li>
</ul>
<p>
  Isn’t that great? And all of that is editable. But wait, there’s more. Let’s try a code block:
</p>
<pre><code class="language-css">body {
display: none;
}</code></pre>
<p>
  I know, I know, this is impressive. It’s only the tip of the iceberg though. Give it a try and click a little bit around. Don’t forget to check the other examples too.
</p>
<blockquote>
  Wow, that’s amazing. Good work, boy! 👏
  <br />
  — Mom
</blockquote>
`

const extensions = [
  Document,
  Paragraph,
  Text,
  TaskItem,
  TaskList.configure({
    itemTypeName: 'taskItem'
  }),
  Color.configure({ types: [TextStyle.name, ListItem.name] }),
  TextStyle.configure({ HTMLAttributes: [ListItem.name] }),
  StarterKit.configure({
    bulletList: {
      keepMarks: true,
      keepAttributes: false, 
      HTMLAttributes: {
        class: cn("list-disc list-outside leading-3 -mt-2"),
      },
    },
    orderedList: {
      keepMarks: true,
      keepAttributes: false, 
      HTMLAttributes: {
        class: cn("list-decimal list-outside leading-3 -mt-2"),
      },
    },
    listItem: {
      HTMLAttributes: {
        class: cn("leading-normal -mb-2"),
      },
    },
    blockquote: {
      HTMLAttributes: {
        class: cn("border-l-4 border-primary"),
      },
    },
    codeBlock: {
      HTMLAttributes: {
        class: cn("rounded-md bg-muted text-muted-foreground border p-5 font-mono font-medium"),
      },
    },
    code: {
      HTMLAttributes: {
        class: cn("rounded-md bg-muted  px-1.5 py-1 font-mono font-medium"),
        spellcheck: "false",
      },
    },
    history: false,
  }),
  Collaboration.configure({
    document: provider.document,
  }),
  CollaborationCursor.configure({
    provider,
    user: { name: uuid().substring(5), color: randomColor() },
  }),
  Placeholder.configure({
    placeholder: 'Start typing about something...',
  }),
  CustomBlockCommand.configure({
    suggestion: {
      listType: CustomBlockList,
      render: renderItems,
    },
  }),
]

const defaultValue = {
  type: "doc",
  content: [
    {
      type: "paragraph",
      content: [
        {
          type: "text",
          text: "This is an example for the editor",
        },
      ],
    },
    {
      type: "heading",
      attrs: {
        level: 1,
      },
      content: [
        {
          type: "text",
          text: "H1",
        },
      ],
    },
    {
      type: "heading",
      attrs: {
        level: 2,
      },
      content: [
        {
          type: "text",
          text: "H2",
        },
      ],
    },
    {
      type: "heading",
      attrs: {
        level: 3,
      },
      content: [
        {
          type: "text",
          text: "H3",
        },
      ],
    },
    {
      type: "paragraph",
      content: [
        {
          type: "text",
          text: "text",
        },
      ],
    },
    {
      type: "bulletList",
      attrs: {
        tight: true,
      },
      content: [
        {
          type: "listItem",
          content: [
            {
              type: "paragraph",
              content: [
                {
                  type: "text",
                  text: "new idea",
                },
              ],
            },
          ],
        },
        {
          type: "listItem",
          content: [
            {
              type: "paragraph",
              content: [
                {
                  type: "text",
                  text: "idea",
                },
              ],
            },
          ],
        },
      ],
    },
  ],
};


const DocEditor = () => {
  const [docSchema, setDocSchema] = useState<JSONContent>(defaultValue);

  return (
    <>
      <EditorRoot>
        <EditorProvider 
          extensions={extensions} 
          content={docSchema}  
          // slotBefore={<MenuBar />}
          editorProps={editorProps}
          onUpdate={({ editor }) => {
            setDocSchema(editor.getJSON());
          }}
          autofocus={true}
          // slotAfter={<MyEditorFooter />}
          >
            <CommandView />
            {/* <FloatingMenu editor={null} children={<FloatingMenu1 />} />  */}
            <BubbleMenu editor={null} children={<BubbleMenu1 />} />
          </EditorProvider>
        </EditorRoot>
    </>
  )
}

// const FloatingMenu1 = () => {

//   return <div>
//     Floating Menu
//   </div>
// }

const BubbleMenu1 = () => {
  const { editor } = useCurrentEditor()
  const range = useAtomValue(rangeAtom) as Range;

  if (!editor) {
    return null
  }

  return <div>
    <button
        onClick={() => editor.chain().focus().toggleBold().run()}
        disabled={
          !editor.can()
            .chain()
            .focus()
            .toggleBold()
            .run()
        }
        className={editor.isActive('bold') ? 'is-active' : ''}
      >
        bold
      </button>
      <button
        onClick={() => editor.chain().focus().toggleItalic().run()}
        disabled={
          !editor.can()
            .chain()
            .focus()
            .toggleItalic()
            .run()
        }
        className={editor.isActive('italic') ? 'is-active' : ''}
      >
        italic
      </button>
      <button
        onClick={() => editor.chain().focus().toggleStrike().run()}
        disabled={
          !editor.can()
            .chain()
            .focus()
            .toggleStrike()
            .run()
        }
        className={editor.isActive('strike') ? 'is-active' : ''}
      >
        strike
      </button>
  </div>
}


export default DocEditor;