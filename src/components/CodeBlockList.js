import React from "react";
import CodeBlockItem from "./CodeBlockItem";

const CodeBlockList = (props) => {
  // const navigate = useNavigate();

  // // open new navigations urls using the useNavigae react-router-dom
  // const handleClick = (id) => navigate("/codeblocks/" + id);

  return (
    <div>
      <ul className="lobby-list">
        {props.codeBlocks.map((block) => (
            <CodeBlockItem block={block} />
        ))}
      </ul>
    </div>
  );
};

export default CodeBlockList;
