import React from "react";
import { useNavigate } from "react-router-dom";

const CodeBlockList = (props) => {
  const navigate = useNavigate();

  // open new navigations urls using the useNavigae react-router-dom
  const handleClick = (id) => navigate("/codeblocks/" + id);
  return (
    <div>
      <ul className="lobby-list">
        {props.codeBlocks.map((block) => (
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
    </div>
  );
};

export default CodeBlockList;
