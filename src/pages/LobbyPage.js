import React, { useState, useEffect } from "react";
import CodeBlockList from "../components/CodeBlockList";
import "./LobbyPage.css";

const LobbyPage = () => {
  const [codeBlocks, setCodeBlocks] = useState([]);
  const [isLoadibg, setIsLoading] = useState(true);

  
  // here we get the data from "herokuapp/api/codeBlocks" and set it to the codeBlocks state
  useEffect(() => {
    fetch("https://cst-codeblocks-c252dfeccb9b.herokuapp.com/api/codeBlocks")
    .then((res) => res.json())
    .then((data) => {
      setCodeBlocks(data);
      setIsLoading(false);
    });
  }, []);
  
  return (
    <div className="lobby-page">
      <h1>Choose code block</h1>
      {isLoadibg ? (
        <h1>Loading...</h1>
      ) : (
        <CodeBlockList codeBlocks={codeBlocks} />
      )}
    </div>
  );
};

export default LobbyPage;