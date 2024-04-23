import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
// import io from 'socket.io-client';
import "./LobbyPage.css";

// can you add a loader to my component when the data is being fetched

// listens to server port
// const socket = io('http://localhost:3001');

const LobbyPage = () => {
  const [codeBlocks, setCodeBlocks] = useState([]);
  const [isLoadibg, setIsLoading] = useState(true);
  const navigate = useNavigate();

  // opens pipe line to the server. NOT WORKING YET!!
  // useEffect(() => {
  //     socket.on('codeBlocks', (blocks) => {
  //         setCodeBlocks(blocks);
  //     });

  //     // Cleanup on unmount
  //     return () => {
  //         socket.off('codeBlocks');
  //     };
  // }, []);

  // can you create a function that get the data from "https://cst-codeblocks-c252dfeccb9b.herokuapp.com/api/codeBlocks" and set it to the codeBlocks state
  useEffect(() => {
    fetch("https://cst-codeblocks-c252dfeccb9b.herokuapp.com/api/codeBlocks")
      .then((res) => res.json())
      .then((data) => {
        setCodeBlocks(data);
        setIsLoading(false);
      });
  }, []);

  // open new navigations urls

  const handleClick = (id) => navigate("/codeblocks/" + id);

  return (
    <div className="lobby-page">
      <h1>Choose code block</h1>
      {isLoadibg ? (
        <p>Loading...</p>
      ) : (
        <ul className="lobby-list">
          {codeBlocks.map((block) => (
            <li
              className="lobby-item"
              onClick={() => handleClick(block.id)}
              key={block.id}
            >
              <p>{block.title}</p>
              <button>
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
