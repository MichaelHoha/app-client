import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
// import io from 'socket.io-client';
import "./LobbyPage.css";

const LobbyPage = () => {
  const [codeBlocks, setCodeBlocks] = useState([]);
  const [isLoadibg, setIsLoading] = useState(true);
  const navigate = useNavigate();

  // here we get the data from "herokuapp/api/codeBlocks" and set it to the codeBlocks state
  useEffect(() => {
    fetch("https://cst-codeblocks-c252dfeccb9b.herokuapp.com/api/codeBlocks")
      .then((res) => res.json())
      .then((data) => {
        setCodeBlocks(data);
        setIsLoading(false);
      });
  }, []);

  // open new navigations urls using the useNavigae react-router-dom
  const handleClick = (id) => navigate("/codeblocks/" + id);

  return (
    <div className="lobby-page">
      <h1>Choose code block</h1>
      {isLoadibg ? (
        <p>Loading...</p>
      ) : (
        // TODO export to new component CodeBlockList
        <ul className="lobby-list">
          {codeBlocks.map((block) => (
            // TODO export to new component CodeBlockItem
            <li
              className="lobby-item"
              onClick={() => handleClick(block.id)}
              key={block.id}
            >
              <p>{block.title}</p>
              {/* TODO all styles should be in the css file */}
              <button style={{ backgroundColor: "transparent", border: 0 }}>
                <span>&#8594;</span>
              </button>
            
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default LobbyPage;
