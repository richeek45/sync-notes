import { BubbleMenu, useCurrentEditor } from "@tiptap/react";
import { Bold, Code, CodeXml, Italic, Strikethrough, Underline } from "lucide-react";
import { Button } from "./ui/button";

const SelectMenu = () => {
  const { editor } = useCurrentEditor()
  const buttonClass = `border-none rounded-none px-2 [&_*]:hover:bg-slate-200 hover:bg-slate-200`;

  if (!editor) {
    return null
  }

  return (<BubbleMenu className="bg-slate-50 [&_*]:bg-slate-50 border-2 border-solid border-slate-100 shadow-sm drop-shadow-lg" editor={editor} tippyOptions={{ duration: 100 }}>
    <Button
      variant='ghost'
      onClick={() => editor.chain().focus().toggleBold().run()}
      disabled={!editor.can().chain().focus().toggleBold().run()}
      className={`${buttonClass} ${editor.isActive('bold') ? 'is-active' : ''}`}
    >
      <Bold />
    </Button>
    <Button
      variant='ghost'
      onClick={() => editor.chain().focus().toggleItalic().run()}
      disabled={!editor.can().chain().focus().toggleItalic().run()}
      className={`${buttonClass}${editor.isActive('italic') ? 'is-active' : ''}`}
    >
      <Italic />
    </Button>
    <Button
      variant='ghost'
      onClick={() => editor.chain().focus().toggleUnderline().run()}
      disabled={!editor.can().chain().focus().toggleUnderline().run()}
      className={`${buttonClass} ${editor.isActive('underline') ? 'is-active' : ''}`}
    >
      <Underline />
    </Button>
    <Button
      variant='ghost'
      onClick={() => editor.chain().focus().toggleStrike().run()}
      disabled={!editor.can().chain().focus().toggleStrike().run()}
      className={`${buttonClass} ${editor.isActive('strike') ? 'is-active' : ''}`}
    >
      <Strikethrough />
    </Button>
    <Button
      variant='ghost'
      onClick={() => editor.chain().focus().toggleCode().run()}
      disabled={!editor.can().chain().focus().toggleCode().run()}
      className={`${buttonClass} ${editor.isActive('code') ? 'is-active' : ''}`}
    >
      <Code />
    </Button>
    <Button
      variant='ghost'
      onClick={() => editor.chain().focus().toggleCodeBlock().run()}
      className={`${buttonClass} ${editor.isActive('codeBlock') ? 'is-active' : ''}`}
    >
      <CodeXml />
    </Button>
  </BubbleMenu>)
}

export default SelectMenu;