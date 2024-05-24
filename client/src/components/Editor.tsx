import { EditorProvider, FloatingMenu, BubbleMenu, useCurrentEditor } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import { Color } from '@tiptap/extension-color'
import ListItem from '@tiptap/extension-list-item'
import TextStyle from '@tiptap/extension-text-style'
import Document from '@tiptap/extension-document'
import Paragraph from '@tiptap/extension-paragraph'
import Text from '@tiptap/extension-text'
import Collaboration from '@tiptap/extension-collaboration';
import CollaborationCursor from '@tiptap/extension-collaboration-cursor'
import { v4 as uuid } from 'uuid';

import * as Y from "yjs";
import { HocuspocusProvider } from '@hocuspocus/provider';
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


const editorProps = {
  attributes: {
    className: 'prose prose-sm sm:prose lg:prose-lg xl:prose-2xl mx-auto focus:outline-none',
  },
  transformPastedText(text: string) {
    return text.toUpperCase()
  }
}

// const content = `<p>Hello World! This should be a very big document describing the state of the app right now.</p>`;
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

const MenuBar = () => {
  const  { editor } = useCurrentEditor();

  if (!editor) {
    return null;
  }

  return (
    <>
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
    </>
  )
}

const extensions = [
  Document,
  Paragraph,
  Text,
  Color.configure({ types: [TextStyle.name, ListItem.name] }),
  TextStyle.configure({ HTMLAttributes: [ListItem.name] }),
  StarterKit.configure({
    bulletList: {
      keepMarks: true,
      keepAttributes: false,
      
    },
    orderedList: {
      keepMarks: true,
      keepAttributes: false, 
    },
    history: false,
  }),
  // Register the document with Tiptap
  Collaboration.configure({
    document: provider.document,
  }),
  CollaborationCursor.configure({
    provider,
    user: { name: uuid().substring(5), color: randomColor() },
  }),
]
const Editor = () => {

  return (
    <>
      <EditorProvider 
      extensions={extensions} 
      content={content}  
      slotBefore={<MenuBar />}
      editorProps={editorProps}
      // autofocus={true}
      // slotAfter={<MyEditorFooter />}
      >
        <FloatingMenu editor={null} children={<FloatingMenu1 />} />
        <BubbleMenu editor={null} children={<BubbleMenu1 />} />
      </EditorProvider>

    </>

  )
}

const FloatingMenu1 = () => {

  return <div>
    Floating Menu
  </div>
}

const BubbleMenu1 = () => {
  const { editor } = useCurrentEditor()

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


export default Editor;