import { EditorProvider, JSONContent } from '@tiptap/react'
import CommandView from './CommandView'
import { EditorRoot } from './EditorRoot'
import { useState } from 'react'
import SelectMenu from './SelectMenu'
import { extensions } from '../utils/extensions'

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

const DocHeading = () => {
  // get the heading from the provider and add it

  return (
    <h1 className='ml-10'>Document Heading</h1>
  )
}

const DocEditor = () => {
  const [docSchema, setDocSchema] = useState<JSONContent>(defaultValue);

  return (
    <>
      <EditorRoot>
        <EditorProvider 
          extensions={extensions} 
          content={docSchema}  
          editorProps={editorProps}

          onUpdate={({ editor }) => {
            setDocSchema(editor.getJSON());
          }}

          autofocus='start'
          slotBefore={<DocHeading />}
          // slotAfter={<MyEditorFooter />}
        >
          <CommandView />
          {/* <FloatingMenu editor={null} children={<FloatingMenu1 />} />  */}
          <SelectMenu />
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



export default DocEditor;