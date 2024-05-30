import { EditorProvider, JSONContent, useCurrentEditor } from '@tiptap/react'
import CommandView from './CommandView'
import { EditorRoot } from './EditorRoot'
import { useState } from 'react'
import SelectMenu from './SelectMenu'
import { charLimit, extensions } from '../utils/extensions'

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

const DocHeading = ({ title } : { title: string }) => {
  const { editor } = useCurrentEditor();
  const charsCount = editor?.storage.characterCount;

  return (
    <>
      <div className="flex justify-between gap-10 w-[100%] py-2">
        <h1 className='ml-10'>{ title || "Document Heading" }</h1>
        <div className="flex z-10 mb-5 gap-2">
          {/* <div className="rounded-lg bg-accent px-2 py-1 text-sm text-muted-foreground">{saveStatus}</div> */}
          <div className={"flex flex-col justify-center align-middle rounded-lg bg-accent px-2 text-sm text-muted-foreground"}>
            <span>
              {charsCount.characters()}/{charLimit} characters
            </span>
            <span>
              {charsCount.words()} words
            </span>
          </div>
        </div>
      </div>
    </>
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
          slotBefore={<DocHeading title={""} />}
          // slotAfter={<MyEditorFooter />}
        >

          {/* <div className="character-count">
            {editor?.storage.characterCount.characters()}/{24} characters
            <br />
            {editor?.storage.characterCount.words()} words
          </div> */}
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