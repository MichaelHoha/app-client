import React, { useState, useEffect } from "react";
import io from "socket.io-client";

const socket = io("http://localhost:3001");

const CodeBlockPage = ({ match }) => {
  const [codeBlock, setCodeBlock] = useState(null);

  // create a connect function to connect to the socket.io server
  useEffect(() => {
    socket.on("connect", () => {
      console.log("Connected to server");
    });

    // Cleanup on unmount
    return () => {
      socket.disconnect();
    };
  });

  // create a fetch GET function to get a block page by the match.params.id with axios
  useEffect(() => {
    const blockId = match.params.id;
    fetch(`http://localhost:3001/code-blocks/${blockId}`)
      .then((res) => res.json())
      .then((data) => {
        setCodeBlock(data);
      });

    // Cleanup on unmount
    return () => {
      setCodeBlock(null);
    };
  }, [match.params.id]);

  // create a function that use axios fetch POST to create a new code block page by id
  const createCodeBlock = () => {
    fetch("http://localhost:3001/code-blocks", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title: "New Code Block",
        code: 'console.log("Hello, World!")',
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        setCodeBlock(data);
      });
  };

  // use useEffect to get the code blocks by id with socket.io
  useEffect(() => {
    const blockId = match.params.id;
    socket.emit("joinRoom", blockId);

    socket.on("codeBlock", (block) => {
      setCodeBlock(block);
    });

    // Cleanup on unmount
    return () => {
      socket.emit("leaveRoom", blockId);
      socket.off("codeBlock");
    };
  });

  // useEffect(() => {
  //     const blockId = match.params.id;
  //     socket.emit('joinRoom', blockId);

  //     socket.on('codeBlock', (block) => {
  //         setCodeBlock(block);
  //     });

  //     // Cleanup on unmount
  //     return () => {
  //         socket.emit('leaveRoom', blockId);
  //         socket.off('codeBlock');
  //     };
  // }, [match.params.id]);

  return (
    <div>
      <h1>Code Block</h1>
      <div style={{ border: "1px solid black" }}>
        <h2>{codeBlock?.title}</h2>
        <pre>
          <code>{codeBlock?.code}</code>
        </pre>
      </div>
    </div>
  );
};

export default CodeBlockPage;
