import React from "react";
import { useDrag } from "react-dnd";
import styled from "styled-components";

function DraggableItem({ item, color }) {
  const itemStyle = {
    backgroundColor: color,
  };

  const [, drag] = useDrag({
    type: "ITEM",
    item,
  });

  return (
    <ItemStyle>
      <div ref={drag} className="draggable-item" style={itemStyle}>
        {item.name}
      </div>
    </ItemStyle>
  );
}

export default DraggableItem;
const ItemStyle = styled.div`
  .draggable-item {
    color: #333333;
    font-size: 1vw;
    padding: 0.5vh 0.5vw;
    margin-bottom: 10px;
    cursor: grab;
    border-radius: var(--border-radius);
    background-color: #c3d0ae;
    transition: transform 0.2s ease, box-shadow 0.2s ease;
  }

  .draggable-item:hover {
    transform: scale(1.02);
    background-color: rgba(255, 255, 255, 0.8);
    box-shadow: 0 0 15px rgba(0, 0, 0, 0.1);
  }
`;
