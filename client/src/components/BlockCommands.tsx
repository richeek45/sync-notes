import { Editor, Extension, Range } from "@tiptap/core";
import { Suggestion, type SuggestionOptions } from "@tiptap/suggestion"
import { ReactNode } from "react";
import { Code, List, ListChecks, ListOrdered, ListTodo, Quote, Text } from "lucide-react";
import { ReactRenderer } from "@tiptap/react";
import tippy, { GetReferenceClientRect, Instance, Props } from "tippy.js";
import { EditorCommandOut } from "./EditorCommand";

interface CommandTypes {
  icon: ReactNode,
  title: string,
  description: string,
  command: (props: { editor: Editor, range: Range }) => void
}

export const CustomBlockList: CommandTypes[] = [
  {
    title:'Text',
    description:'Just start typing with plain text',
    icon: <Text size={18} />, 
    command: ({ editor, range }) => {
      editor.chain().focus().deleteRange(range).toggleNode("paragraph", "paragraph").run()
    }
  },
  {
    title: 'To-do list',
    description: 'Track tasks with a to-do list',
    icon: <ListTodo />,
    command({ editor, range }) {
      editor.chain().focus().deleteRange(range).toggleTaskList().run()
    },
  },
  {
    title: 'Numbered list',
    description: 'Create a list with numbering',
    icon: <ListOrdered />,
    command({ editor, range }) {
      editor.chain().focus().deleteRange(range).toggleOrderedList().run()
    },
  },
  {
    title: 'Bulleted list',
    description: 'Create a simple bulleted list',
    icon:<ListChecks />,
    command({ editor, range }) {
      editor.chain().focus().deleteRange(range).toggleBulletList().run()
    },
  },
  {
    title: 'Heading 1',
    description: 'Big section heading',
    icon:<List />,
    command({ editor, range }) {
      editor.chain().focus().deleteRange(range).setNode('heading', { level: 1 }).run()
    },
  },
  {
    title: 'Heading 2',
    description: 'Medium section heading',
    icon:<List />,
    command({ editor, range }) {
      editor.chain().focus().deleteRange(range).setNode('heading', { level: 2 }).run()
    },
  },
  {
    title: 'Heading 3',
    description: 'Small section heading',
    icon:<List />,
    command({ editor, range }) {
      editor.chain().focus().deleteRange(range).setNode('heading', { level: 3 }).run()
    },
  },
  {
    title: 'Code',
    description: 'Add a code snippet',
    icon: <Code />,
    command({ editor, range }) {
      editor.chain().focus().deleteRange(range).toggleCodeBlock().run()
    }
  },
  {
    title: 'Quote',
    description: 'Capture a quote',
    icon: <Quote />,
    command({ editor, range }) {
      editor.chain().focus().deleteRange(range).toggleBlockquote().run()
    }
  }
]

export const renderItems = () => {
  let component: ReactRenderer | null = null;
  let popup: Instance<Props>[] | null = null;

  return {
    onStart: (props: { editor: Editor; clientRect: DOMRect }) => {
      component = new ReactRenderer(EditorCommandOut, {
        props,
        editor: props.editor,
      });

      const { selection } = props.editor.state;

      const parentNode = selection.$from.node(selection.$from.depth);
      const blockType = parentNode.type.name;

      if (blockType === "codeBlock") {
        return false;
      }

      // @ts-expect-error - error
      popup = tippy("body", {
        getReferenceClientRect: props.clientRect,
        appendTo: () => document.body,
        content: component.element,
        showOnCreate: true,
        interactive: true,
        trigger: "manual",
        placement: "bottom-start",
      });
    },
    onUpdate: (props: { editor: Editor; clientRect: GetReferenceClientRect }) => {
      component?.updateProps(props);

      popup?.[0]?.setProps({
        getReferenceClientRect: props.clientRect,
      });
    },

    onKeyDown: (props: { event: KeyboardEvent }) => {
      if (props.event.key === "Escape") {
        popup?.[0]?.hide();

        return true;
      }

      // @ts-expect-error - error
      return component?.ref?.onKeyDown(props);
    },
    onExit: () => {
      popup?.[0]?.destroy();
      component?.destroy();
    },
  };
};


export const CustomBlockCommand = Extension.create({
  addOptions() {
    return {
      suggestion: {
        char: "/",
        command: ({ editor, range, props }) => {
          console.log(props, 'command')
          props.command({ editor, range });
        },
      } as SuggestionOptions,
    }
  },

  addProseMirrorPlugins() {
    return [
      Suggestion({
        editor: this.editor,
        ...this.options.suggestion,
      }),
    ]
  },
})
