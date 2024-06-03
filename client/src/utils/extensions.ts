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
import Underline from '@tiptap/extension-underline'
import CharacterCount from '@tiptap/extension-character-count'
import Link from '@tiptap/extension-link'
import { cn } from '../lib/utils'
import GlobalDragHandle from 'tiptap-extension-global-drag-handle'
import { CustomBlockCommand, CustomBlockList, renderItems } from '../components/BlockCommands'
import { HocuspocusProvider } from '@hocuspocus/provider';
import BubbleMenu from '@tiptap/extension-bubble-menu'
import { getRandomColor, getRandomName } from './userInfo'
import { DocumentI } from './atoms'
import { DocumentRoom } from './documentClass'

export const charLimit = 2000;

// Function to change the document name
export function handleDocument(document: DocumentI, provider: HocuspocusProvider, setProvider: (provider: DocumentRoom) => void) {
  provider.disconnect();

  const newProvider = new DocumentRoom(document.title);
  setProvider(newProvider);
}

export const getExtensions = (provider: HocuspocusProvider) => {
  const extensions = [
    Document,
    Paragraph,
    Text,
    TaskItem,
    GlobalDragHandle.configure({
      dragHandleWidth: 30,
      scrollTreshold: 100 
    }),
    BubbleMenu,
    Underline,
    CharacterCount.configure({
      limit: charLimit,
    }),
    Link.configure({
      autolink: false,
      protocols: ['ftp', 'mailto'],
      HTMLAttributes: {
        class: 'cursor-pointer',
      },
    }),
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
          class: cn("list-disc list-outside leading-normal -mt-2 pl-5"),
        },
      },
      orderedList: {
        keepMarks: true,
        keepAttributes: false, 
        HTMLAttributes: {
          class: cn("list-decimal list-outside leading-normal -mt-2 pl-5"),
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
        languageClassPrefix: "language-javacript",     
        HTMLAttributes: {
          class: cn("rounded-md bg-muted text-muted-foreground border p-5 bg-slate-100 font-mono font-medium"),
        },
      },
      code: {
        HTMLAttributes: {
          class: cn("rounded-md bg-muted  px-1.5 py-1 bg-slate-100 font-mono font-medium"),
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
      user: { name: getRandomName(), color: getRandomColor() },
    }),
    Placeholder.configure({
      placeholder: 'Write something or type (/) for commands...',
    }),
    CustomBlockCommand.configure({
      suggestion: {
        items: () => CustomBlockList,
        render: renderItems,
      },
    }),
  ]
  return extensions;
} 