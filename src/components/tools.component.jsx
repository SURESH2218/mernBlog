import Embed from "@editorjs/embed";
import Header from "@editorjs/header";
import Image from "@editorjs/image";
import InlineCode from "@editorjs/inline-code";
import LinkTool from "@editorjs/link";
import List from "@editorjs/list";
import Marker from "@editorjs/marker";
import Quote from "@editorjs/quote";

export const tools = {
  embed: Embed,
  list: {
    class: List,
    inlineToolbar: true,
  },
  marker: Marker,
  quote: Quote,
  image: Image,
  inlincode: InlineCode,
  header: {
    class: Header,
    config: {
      placeholder: "Type Heading.....",
      levels: [2, 3],
      defaultLevel: 2,
    },
  },
};
