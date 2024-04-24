import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import io from "socket.io-client";

const socket = io("https://cst-codeblocks-c252dfeccb9b.herokuapp.com");

const CodeBlockPage = () => {
  const [codeBlock, setCodeBlock] = useState(null);
  const { id: selectedBlockId } = useParams();

console.log("selectedBlockId!!! " + selectedBlockId);

  // todo export to hook new file useCodeBlock
  useEffect(() => {
    // listens to the initial code block from the server
    socket.emit("initialCodeBlock", { id: selectedBlockId });

    // geting the initial code block from the server
    socket.on("initialCodeBlock", (initialCodeBlock) => {
      console.log("initialCodeBlock", initialCodeBlock);
      setCodeBlock(initialCodeBlock);
    });

    // Listen for code changes from the server
    socket.on("codeChange", ({ id, content }) => {
      setCodeBlock((prevBlock) =>
        id === selectedBlockId ? { ...prevBlock, content } : prevBlock
      );
    });

    // Clean up event listeners when component unmounts
    return () => {
      socket.off("initialCodeBlocks");
      socket.off("codeChange");
    };
  }, []);

  const handleCodeChange = (content) => {
    // TODO add delay use debounce
    socket.emit("codeChange", { id: selectedBlockId, content });
  };

  return (
    <div>
      <h1>Code Block</h1>
      <div>
        <h2>{codeBlock?.title}</h2>
        <textarea
          style={{ resize: "none" }}
          value={codeBlock?.content}
          onChange={(e) => handleCodeChange(e.target.value)}
          rows={10}
          cols={50}
        />
        <pre>
          <code>{codeBlock?.content}</code>
        </pre>
      </div>
    </div>
  );
};

export default CodeBlockPage;
