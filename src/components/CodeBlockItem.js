import React from "react";
import { useNavigate } from "react-router-dom";
import io from "socket.io-client";

const socket = io("https://cst-codeblocks-c252dfeccb9b.herokuapp.com");

const CodeBlockItem = ({ block }) => {
  const navigate = useNavigate();

  // open new navigations urls using the useNavigae react-router-dom
  const handleClick = (id) => {
    navigate("/codeblocks/" + id);
    //console.log("Block info " + block.participants_count);
    //socket.emit('setPraticipantesCount', id);
  };

  return (
    <div>
      <li
        className="lobby-item"
        onClick={() => handleClick(block.id)}
        key={block.id}
      >
        <p>{block.title}</p>
        <button style={{ backgroundColor: "transparent", border: 0 }}>
          <span>&#8594;</span>
        </button>
      </li>
    </div>
  );
};

export default CodeBlockItem;
