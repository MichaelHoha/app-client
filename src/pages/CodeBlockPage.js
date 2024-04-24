import React, { useState, useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import io from "socket.io-client";
import "./CodeBlockPage.css";
import debounce from "lodash.debounce";
import "highlight.js/styles/default.css";
import SyntaxHighlighter from "react-syntax-highlighter";
import { docco } from "react-syntax-highlighter/dist/esm/styles/hljs";

const socket = io("https://cst-codeblocks-c252dfeccb9b.herokuapp.com");

const CodeBlockPage = () => {
  const [codeBlock, setCodeBlock] = useState(null);
  const [codeBlockParticipants, setPraticipantesCount] = useState(0);
  const { id: selectedBlockId } = useParams();
  const codeRef = useRef(null);

  // todo export to hook new file useCodeBlock
  useEffect(() => {
    // listens to the initial code block from the server
    socket.emit("initialCodeBlock", { id: selectedBlockId });

    // geting the initial code block from the server
    socket.on(
      "initialCodeBlock",
      (initialCodeBlock) => {
        // console.log("initialCodeBlock", initialCodeBlock);
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

    // socket.on("setPraticipantesCount", ({ id, participants_count }) => {
    //   setPraticipantesCount((prevBlock) =>
    //     id === selectedBlockId
    //       ? { ...prevBlock, participants_count }
    //       : prevBlock
    //   );
    // });

    // Clean up event listeners when component unmounts
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
    // TODO add delay use debounce
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
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            opacity: 0, // Make the textarea invisible but still clickable/editable
            zIndex: 1, // Ensure textarea is on top of SyntaxHighlighter
            cursor: "text", // Set cursor to text
          }}
        />
      </div>
    </div>
  );
};

export default CodeBlockPage;
