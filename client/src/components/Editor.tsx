import { EditorProvider, JSONContent, useCurrentEditor } from '@tiptap/react'
import CommandView from './CommandView'
import SelectMenu from './SelectMenu'
import { charLimit, getExtensions } from '../utils/extensions'
import { useAtom } from 'jotai'
import { defaultContentAtom, providerAtom } from '../utils/atoms'
import { DocumentRoom } from '../utils/documentClass'
import { useEffect } from 'react'
import { useParams } from 'react-router-dom'

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
const defaultDocument = "reciprocity";

const DocHeading = ({title} : {title: string}) => {
  const { editor } = useCurrentEditor();
  const charsCount = editor?.storage.characterCount;

  return (
    <>
      <div className="flex justify-between gap-10 w-[100%] py-2">
        <h1 className='ml-10'>{ title || "Document Heading" }</h1>
        <div className="flex z-10 mb-5 gap-2">
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
  const [docSchema, setDocSchema] = useAtom<JSONContent>(defaultContentAtom);
  const [docProvider, setDocProvider] = useAtom(providerAtom);
  const provider = docProvider?.provider;
  const { editor } = useCurrentEditor();
  const { name } = useParams();

  useEffect(() => {
    const currentProvider = new DocumentRoom(name || defaultDocument);
    setDocProvider(currentProvider);

    return () => {
      setDocProvider(null);
      editor?.destroy();
    }
  }, [])

  if (!provider) return null;

  return (
    <div className="mx-2">
      <EditorProvider 
        extensions={getExtensions(provider)} 
        content={docSchema}  
        editorProps={editorProps}
        editable={true}
        onUpdate={({ editor }) => {
          console.log('editor is updating!!', editor.getJSON())
          setDocSchema(editor.getJSON());
        }}
        autofocus='start'
        slotBefore={<DocHeading title={docProvider.name || defaultDocument} />}
        // slotAfter={<MyEditorFooter />}
      >
        <CommandView />
        <SelectMenu />
      </EditorProvider>
    </div>
  )
}

export default DocEditor;