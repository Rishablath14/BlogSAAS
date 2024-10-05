import { type JSONContent } from "novel";
import { useMemo } from "react";
import { generateHTML } from "@tiptap/html";
import Document from "@tiptap/extension-document";
import Paragraph from "@tiptap/extension-paragraph";
import Text from "@tiptap/extension-text";
import Link from "@tiptap/extension-link";
import Underline from "@tiptap/extension-underline";
import Heading from "@tiptap/extension-heading";
import ListItem from "@tiptap/extension-list-item";
import BulletList from "@tiptap/extension-bullet-list";
import Code from "@tiptap/extension-code";
import BlockQuote from "@tiptap/extension-blockquote";
import TextStyle from "@tiptap/extension-text-style";
import CodeBlock from "@tiptap/extension-code-block";
import OrderList from "@tiptap/extension-ordered-list";
import TodoList from "@tiptap/extension-task-list";
import TodoItems from "@tiptap/extension-task-item";
import Bold from "@tiptap/extension-bold"; // Ajoutez cette ligne
import Italic from "@tiptap/extension-italic";
import HardBreak from "@tiptap/extension-hard-break"; // Ajoutez cette ligne
import Image  from "@tiptap/extension-image";
import { Color } from "@tiptap/extension-color";



export function RenderArticle({ json }: { json: JSONContent }) {
  const outPut = useMemo(() => {
    return generateHTML(json, [
      Document,
      Paragraph,
      TodoItems,
      TodoList,
      Text,
      Link,
      Underline,
      Heading,
      ListItem,
      BulletList,
      Code,
      BlockQuote,
      TextStyle,
      CodeBlock,
      OrderList,
      Image,
      Italic,
      Color,
      Bold, // Ajoutez cette ligne
      HardBreak, // Ajoutez cette ligne
    ]);
  }, [json]);

    return (
      <div
      style={{maxWidth: '100%'}}
      className="prose w-full sm:prose-xl dark:prose-invert prose-li:marker:text-primary"
      dangerouslySetInnerHTML={{ __html: outPut }}
      />
  );
}
