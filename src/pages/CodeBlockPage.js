import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import io from "socket.io-client";
import "./CodeBlockPage.css";

const socket = io("https://cst-codeblocks-c252dfeccb9b.herokuapp.com");

const CodeBlockPage = () => {
  const [codeBlock, setCodeBlock] = useState(null);
  const [codeBlockParticipants, setPraticipantesCount] = useState(0);
  const { id: selectedBlockId } = useParams();

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

        console.log(
          "This is from the codeBloack page component " +
            initialCodeBlock.participants_count
        );
      },
      []
    );

    // Listen for code changes from the server
    socket.on("codeChange", ({ id, content }) => {
      setCodeBlock((prevBlock) =>
        id === selectedBlockId ? { ...prevBlock, content } : prevBlock
      );
    });

    // // Listen for code changes from the server
    // socket.on("praticipantesCountDown", ({ id, content }) => {
    //   setCodeBlock((prevBlock) =>
    //     id === selectedBlockId ? { ...prevBlock, content } : prevBlock
    //   );

    socket.on("setPraticipantesCount", ({ id, participants_count }) => {
      
      setPraticipantesCount((prevBlock) =>
        id === selectedBlockId
          ? { ...prevBlock, participants_count }
          : prevBlock
      );
      // console.log(
      //   "This is from the codeBloack page component " + codeBlockParticipants
      // );
    });

    // Clean up event listeners when component unmounts
    return () => {
      socket.emit("praticipantesCountDown", {
        id: selectedBlockId,
        codeBlockParticipants,
      });
     // console.log("This is the unamount " +  id);

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
      <textarea
        className="code-textarea"
        value={codeBlock?.content}
        onChange={(e) => handleCodeChange(e.target.value)}
        rows={10}
        cols={50}
      />
    </div>
  );
};

export default CodeBlockPage;
