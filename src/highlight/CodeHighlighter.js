import React, { useEffect } from "react";
import hljs from "highlight.js";

// with this functions component we can highlight code blocks in our text area
const CodeHighlighter = ({ code }) => {
  useEffect(() => {
    hljs.highlightAll();
  }, []);

  return (
    <pre>
      <code className="language-javascript">
        <textarea value={code} />
      </code>
    </pre>
  );
};

export default CodeHighlighter;
