import React from "react";

import { useDrop } from "react-dnd";
import DraggableItem from "./DraggableItem";
import styled from "styled-components";
import { motion } from "framer-motion";

function Dropzone({
  catg,
  items,
  handleDrop,
  boardName,
  removeDropzone,
  showing,
}) {
  const [{ isOver }, drop] = useDrop({
    accept: "ITEM",
    drop: (item) => handleDrop(item, catg),
    collect: (monitor) => ({ isOver: monitor.isOver() }),
  });

  const styled = {
    backgroundColor: isOver ? "rgb(220, 220, 220)" : "rgb(255, 255, 255)",
  };

  const filteredItems = items.filter((item) => item.catg === catg);

  //----animation---------
  const variants = {
    hidden: { opacity: 0, scale: 0.5 },
    visible: { opacity: 1, scale: 1 },
  };

  return (
    <DropzoneStyle>
      <motion.div
        ref={drop}
        className="dropzone"
        style={styled}
        initial="hidden" // 初始状态
        animate="visible"
        exit="hidden"
        variants={variants}
      >
        <div className="title-part">
          <a
            onClick={() => removeDropzone(boardName)}
            style={{ display: showing ? "block" : "none" }}
          >
            +
          </a>

          <div className="title">{boardName}</div>
        </div>
        <div className="dropitem">
          {filteredItems.map((item) => (
            <DraggableItem key={item.id} item={item} color={item.color} />
          ))}
        </div>
      </motion.div>
    </DropzoneStyle>
  );
}

export default Dropzone;
const DropzoneStyle = styled.div`
  .dropzone {
    min-height: 200px;
    width: auto;
    min-width: 15vw;
    max-width: 40w;
    border-radius: 20px;
    transition: background-color 0.3s ease;
    box-shadow: 0 0 15px rgba(0, 0, 0, 0.1);
    flex-direction: column;
    display: flex;
    justify-content: start;
    flex-wrap: wrap;
  }

  .title {
    display: flex;
    justify-content: center;
    color: #ffffff;
    font-size: 1.8vh;

    height: auto;
    width: 100%;
    display: flex;
    align-items: center;
    flex-wrap: wrap;
  }

  .title-part {
    text-align: center;
    padding: 1vh 1.8vw;

    display: flex;
    border-radius: 20px 20px 0px 0px;
    -webkit-border-radius: 20px 20px 0px 0px;
    -moz-border-radius: 20px 20px 0px 0px;
    background-color: var(--secondary-color);
    width: 100%;
  }
  .dropitem {
    display: flex;
    padding: 1.5vw 1.5vw;

    flex-direction: column;
    gap: 1vw;
  }
  a {
    padding-right: 10px;

    transform: rotate(45deg);
    text-align: center;
    text-decoration: none;
    z-index: 5;
    font-size: 1.5rem;

    color: #ffffff;
    top: 0vh;
    left: 90%;
    cursor: pointer;
  }
`;
