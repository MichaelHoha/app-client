import React from "react";
import CodeBlockItem from "./CodeBlockItem";

const CodeBlockList = (props) => {

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
