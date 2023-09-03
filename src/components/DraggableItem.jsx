import React from "react";
import { useDrag } from "react-dnd";
import styled from "styled-components";
import { motion } from "framer-motion";

function DraggableItem({ item, color }) {
  const itemStyle = {
    backgroundColor: color,
  };

  const [, drag] = useDrag({
    type: "ITEM",
    item,
  });

  // -----animation-------
  const variants = {
    hidden: { opacity: 0, scale: 0.7 },
    visible: { opacity: 1, scale: 1 },
  };

  return (
    <ItemStyle>
      <motion.div
        ref={drag}
        className="draggable-item"
        style={itemStyle}
        initial="hidden"
        animate="visible"
        variants={variants}
      >
        {item.name}
      </motion.div>
    </ItemStyle>
  );
}

export default DraggableItem;
const ItemStyle = styled.div`
  .draggable-item {
    color: #ffffff;
    font-size: 1vw;
    padding: 1.4vh 1.3vw;
    display: flex;
    justify-content: center;
    align-items: center;

    cursor: grab;
    border-radius: var(--border-radius);
    background-color: var(--secondary-color);
    transition: transform 0.2s ease;
  }

  .draggable-item:hover {
    transform: scale(1.02);

    box-shadow: 0 0 15px rgba(0, 0, 0, 0.1);
  }
`;
