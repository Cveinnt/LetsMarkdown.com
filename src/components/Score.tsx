import { useEffect, useRef } from "react";
import { Box, Stack } from "@chakra-ui/react";
import { nanoid } from "nanoid";
import MarkdownIt from "markdown-it";
import emoji from "markdown-it-emoji";
import footnote from "markdown-it-footnote";
import sup from "markdown-it-sup";
import sub from "markdown-it-sub";
import sanitizer from "markdown-it-sanitizer";
import hljs from "highlight.js";
import * as markdown from "./markdown.css";
import * as modest from "./modest.css";

type ScoreProps = {
  notes: string;
  darkMode: boolean;
};

function Score({ notes, darkMode }: ScoreProps) {
  const ref = useRef<any>(null);
  if (ref.current === null) {
    const id = nanoid();
    ref.current = {
      id,
    };
  }

  useEffect(() => {
    try {
      let md = MarkdownIt({
        html: true,
        linkify: true,
        typographer: true,
        highlight: function (str, lang) {
          if (lang && hljs.getLanguage(lang)) {
            try {
              return hljs.highlight(str, { language: lang }).value;
            } catch (__) {}
          }

          return ""; // use external default escaping
        },
      })
        .use(emoji)
        .use(sanitizer)
        .use(footnote)
        .use(sup)
        .use(sub);
      let value = notes;
      let result = md.render(value);
      document.getElementById("preview")!.innerHTML = result;
    } catch (error) {
      console.warn("Error when running mardown-it.js:", error);
    }
  }, [notes]);

  return (
    <Box h="100%" w="100%" overflow="auto" p={3}>
      <Box __css={markdown} as="div" h="100%" id="preview" />
    </Box>
  );
}

export default Score;
