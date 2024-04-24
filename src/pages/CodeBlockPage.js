import React, { useState, useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import io from "socket.io-client";
import "./CodeBlockPage.css";
import "highlight.js/styles/default.css";
import SyntaxHighlighter from "react-syntax-highlighter";
import { docco } from "react-syntax-highlighter/dist/esm/styles/hljs";

const socket = io("https://cst-codeblocks-c252dfeccb9b.herokuapp.com");

const CodeBlockPage = () => {
  const [codeBlock, setCodeBlock] = useState(null);
  const [codeBlockParticipants, setPraticipantesCount] = useState(0);
  const { id: selectedBlockId } = useParams();

  // TODO export to hook new file useCodeBlock
  useEffect(() => {
    // listens to the initial code block from the server
    socket.emit("initialCodeBlock", { id: selectedBlockId });

    // geting the initial code block from the server
    socket.on(
      "initialCodeBlock",
      (initialCodeBlock) => {
        setCodeBlock(initialCodeBlock);

        socket.emit("setPraticipantesCount", {
          id: selectedBlockId,
          codeBlockParticipants,
        });
      },
      []
    );

    // Listen for code changes from the server
    socket.on("codeChange", ({ id, content }) => {
      setCodeBlock((prevBlock) =>
        id === selectedBlockId ? { ...prevBlock, content } : prevBlock
      );
    });

    // waiting for code changes from the server
    socket.on("praticipantesCountDown", ({ id, codeBlockParticipants }) => {
      setCodeBlock((prevBlock) =>
        id === selectedBlockId
          ? { ...prevBlock, codeBlockParticipants }
          : prevBlock
      );
    });

    // returns when the component is unmounted -> means closed
    return () => {
      socket.emit("praticipantesCountDown", {
        id: selectedBlockId,
        codeBlockParticipants,
      });

      socket.off("initialCodeBlocks");
      socket.off("codeChange");
    };
  }, []);

  const handleCodeChange = (content) => {
    // tried to add delay use debounce but that didn't worked
    socket.emit("codeChange", { id: selectedBlockId, content });
  };

  return (
    <div className="code-block-page-style">
      <h1 className="block-page-title">Code Block</h1>
      <h2 className="func-title">{codeBlock?.title}</h2>

      <div style={{ position: "relative" }}>
        <SyntaxHighlighter language="javascript" style={docco}>
          {codeBlock?.content}
        </SyntaxHighlighter>

        <textarea
          className="code-textarea"
          value={codeBlock?.content}
          onChange={(e) => handleCodeChange(e.target.value)}
        />
      </div>
    </div>
  );
};

export default CodeBlockPage;
