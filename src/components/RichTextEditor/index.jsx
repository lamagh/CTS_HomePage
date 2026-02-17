import { useEffect } from "react";
import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Bold from "@tiptap/extension-bold";
import Italic from "@tiptap/extension-italic";
import Strike from "@tiptap/extension-strike";
import Underline from "@tiptap/extension-underline";
import TextAlign from "@tiptap/extension-text-align";
import Heading from "@tiptap/extension-heading";
import Link from "@tiptap/extension-link";
import Blockquote from "@tiptap/extension-blockquote";
import BulletList from "@tiptap/extension-bullet-list";
import OrderedList from "@tiptap/extension-ordered-list";
import CodeBlock from "@tiptap/extension-code-block";
import { IconButton, Box } from "@mui/material";
import FormatBoldIcon from "@mui/icons-material/FormatBold";
import FormatItalicIcon from "@mui/icons-material/FormatItalic";
import FormatUnderlinedIcon from "@mui/icons-material/FormatUnderlined";
import StrikethroughSIcon from "@mui/icons-material/StrikethroughS";
import FormatAlignLeftIcon from "@mui/icons-material/FormatAlignLeft";
import FormatAlignCenterIcon from "@mui/icons-material/FormatAlignCenter";
import FormatAlignRightIcon from "@mui/icons-material/FormatAlignRight";
import FormatAlignJustifyIcon from "@mui/icons-material/FormatAlignJustify";
import FormatListBulletedIcon from "@mui/icons-material/FormatListBulleted";
import FormatListNumberedIcon from "@mui/icons-material/FormatListNumbered";
import FormatQuoteIcon from "@mui/icons-material/FormatQuote";
import CodeIcon from "@mui/icons-material/Code";
import LinkIcon from "@mui/icons-material/Link";
import UndoIcon from "@mui/icons-material/Undo";
import RedoIcon from "@mui/icons-material/Redo";
import LooksOneIcon from "@mui/icons-material/LooksOne";
import LooksTwoIcon from "@mui/icons-material/LooksTwo";
import Looks3Icon from "@mui/icons-material/Looks3";
import Looks4Icon from "@mui/icons-material/Looks4";
import Looks5Icon from "@mui/icons-material/Looks5";
import Looks6Icon from "@mui/icons-material/Looks6";
import Placeholder from "@tiptap/extension-placeholder";

export default function RichTextEditor({
  initialContent,
  onContentChange,
  readonly = false,
}) {
  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        heading: {
          levels: [1, 2, 3, 4, 5, 6],
        },
      }),
      Placeholder.configure({
        placeholder: "Start typing here...",
      }),
      Bold,
      Italic,
      Strike,
      Underline,
      TextAlign.configure({ types: ["heading", "paragraph"] }),
      Heading.configure({ levels: [1, 2, 3, 4, 5, 6] }),
      Link,
      Blockquote,
      BulletList,
      OrderedList,
      CodeBlock,
    ],
    content: initialContent,
    onUpdate: ({ editor }) => {
      const json = editor.getJSON();
      onContentChange(json);
    },
    onCreate: ({ editor }) => {
      console.log("Editor created with content:", editor.getJSON());
    },
    editable: !readonly,
    editorProps: {
      handleDOMEvents: {
        beforeinput: ({ event }) => {
          if (typeof window === "undefined") {
            return true;
          }
        },
      },
    },
  });
  useEffect(() => {
    if (
      editor &&
      initialContent &&
      JSON.stringify(editor.getJSON()) !== JSON.stringify(initialContent)
    ) {
      editor.commands.setContent(initialContent);
    }
  }, [initialContent, editor]);
  return (
    <div>
      {editor && !readonly && (
        <Box
          sx={{
            border: "1px solid #ccc",
            padding: "10px",
            marginBottom: "10px",
            borderRadius: "10px",
          }}
        >
          <IconButton
            onClick={() => editor.chain().focus().toggleBold().run()}
            disabled={!editor.can().chain().focus().toggleBold().run()}
          >
            <FormatBoldIcon />
          </IconButton>
          <IconButton
            onClick={() => editor.chain().focus().toggleItalic().run()}
            disabled={!editor.can().chain().focus().toggleItalic().run()}
          >
            <FormatItalicIcon />
          </IconButton>
          <IconButton
            onClick={() => editor.chain().focus().toggleStrike().run()}
            disabled={!editor.can().chain().focus().toggleStrike().run()}
          >
            <StrikethroughSIcon />
          </IconButton>
          <IconButton
            onClick={() => editor.chain().focus().toggleUnderline().run()}
            disabled={!editor.can().chain().focus().toggleUnderline().run()}
          >
            <FormatUnderlinedIcon />
          </IconButton>
          <IconButton
            onClick={() =>
              editor.chain().focus().toggleHeading({ level: 1 }).run()
            }
          >
            <LooksOneIcon />
          </IconButton>
          <IconButton
            onClick={() =>
              editor.chain().focus().toggleHeading({ level: 2 }).run()
            }
          >
            <LooksTwoIcon />
          </IconButton>
          <IconButton
            onClick={() =>
              editor.chain().focus().toggleHeading({ level: 3 }).run()
            }
          >
            <Looks3Icon />
          </IconButton>
          <IconButton
            onClick={() =>
              editor.chain().focus().toggleHeading({ level: 4 }).run()
            }
          >
            <Looks4Icon />
          </IconButton>
          <IconButton
            onClick={() =>
              editor.chain().focus().toggleHeading({ level: 5 }).run()
            }
          >
            <Looks5Icon />
          </IconButton>
          <IconButton
            onClick={() =>
              editor.chain().focus().toggleHeading({ level: 6 }).run()
            }
          >
            <Looks6Icon />
          </IconButton>
          <IconButton
            onClick={() => {
              editor.chain().focus().setTextAlign("left").run();
            }}
          >
            <FormatAlignLeftIcon />
          </IconButton>
          <IconButton
            onClick={() => {
              editor.chain().focus().setTextAlign("center").run();
            }}
          >
            <FormatAlignCenterIcon />
          </IconButton>
          <IconButton
            onClick={() => {
              editor.chain().focus().setTextAlign("right").run();
            }}
          >
            <FormatAlignRightIcon />
          </IconButton>
          <IconButton
            onClick={() => editor.chain().focus().setTextAlign("justify").run()}
          >
            <FormatAlignJustifyIcon />
          </IconButton>
          <IconButton
            onClick={() => editor.chain().focus().toggleBlockquote().run()}
            disabled={!editor.can().chain().focus().toggleBlockquote().run()}
          >
            <FormatQuoteIcon />
          </IconButton>
          <IconButton
            onClick={() => editor.chain().focus().toggleBulletList().run()}
            disabled={!editor.can().chain().focus().toggleBulletList().run()}
          >
            <FormatListBulletedIcon />
          </IconButton>
          <IconButton
            onClick={() => editor.chain().focus().toggleOrderedList().run()}
            disabled={!editor.can().chain().focus().toggleOrderedList().run()}
          >
            <FormatListNumberedIcon />
          </IconButton>
          <IconButton
            onClick={() => editor.chain().focus().undo().run()}
            disabled={!editor.can().chain().focus().undo().run()}
          >
            <UndoIcon />
          </IconButton>
          <IconButton
            onClick={() => editor.chain().focus().redo().run()}
            disabled={!editor.can().chain().focus().redo().run()}
          >
            <RedoIcon />
          </IconButton>
          <IconButton
            onClick={() => {
              const url = window.prompt("Enter the URL");
              if (url) {
                editor.chain().focus().setLink({ href: url }).run();
              }
            }}
          >
            <LinkIcon />
          </IconButton>
          <IconButton
            onClick={() => editor.chain().focus().toggleCodeBlock().run()}
            disabled={!editor.can().chain().focus().toggleCodeBlock().run()}
          >
            <CodeIcon />
          </IconButton>
        </Box>
      )}
      <EditorContent
        editor={editor}
        className={`editor-content ${
          readonly ? "readonly-editor" : "editable-editor"
        }`}
      />
    </div>
  );
}
