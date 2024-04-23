import React, { useState, useEffect } from "react";
import io from "socket.io-client";

const socket = io("https://cst-codeblocks-c252dfeccb9b.herokuapp.com");

const CodeBlockPage = ({ match }) => {
  const [codeBlock, setCodeBlock] = useState(null);
  const selectedBlockId = match.params.id;

  useEffect(() => {
    // Listen for initial code blocks from the server
    socket.on("initialCodeBlocks", (initialBlocks) => {
      setCodeBlock(initialBlocks);
    });

    // Listen for code changes from the server
    socket.on("codeChange", ({ id, content }) => {
      setCodeBlock((prevBlocks) =>
        prevBlocks.map((block) =>
          block.id === id ? { ...block, content } : block
        )
      );
    });

    // Clean up event listeners when component unmounts
    return () => {
      socket.off("initialCodeBlocks");
      socket.off("codeChange");
    };
  }, []);

  const handleCodeChange = (content) => {
    socket.emit("codeChange", { id: selectedBlockId, content });
  };

  return (
    <div>
      <h1>Code Block</h1>
      <div style={{ border: "1px solid black" }}>
        <h2>{codeBlock?.title}</h2>
        <textarea
          value={codeBlock.content}
          onChange={(e) => handleCodeChange(e.target.value)}
          rows={10}
          cols={50}
        />
        <pre>
          <code>{codeBlock?.code}</code>
        </pre>
      </div>
    </div>
  );
};

export default CodeBlockPage;
