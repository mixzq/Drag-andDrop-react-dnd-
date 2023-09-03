import React from "react";
import { useEffect, useState } from "react";
import { useDrop } from "react-dnd";
import DraggableItem from "./DraggableItem";
import styled from "styled-components";

function Dropzone({
  catg,
  items,
  handleDrop,

  removeDropzone,
  showing,

  updateDropzoneById,
  id,
  key,
}) {
  const [{ isOver }, drop] = useDrop({
    accept: "ITEM",
    drop: (item) => handleDrop(item, catg),
    collect: (monitor) => ({ isOver: monitor.isOver() }),
  });

  const styled = {
    backgroundColor: isOver ? "#efe5d7" : "#fffff8",
  };

  const filteredItems = items.filter((item) => item.catg === catg);
  //----------board maker part----
  const [inputValue, setInputValue] = useState("");
  // console.log(inputValue);
  // const handleInputChange = (e) => {
  //   const newInputValue = e.target.value;

  //   addDropzone(newInputValue);
  //   setInputValue(newInputValue);
  // };

  const handleInputChange = (e) => {
    const newInputValue = e.target.value;
    updateDropzoneById(id, newInputValue); // 使用传入的 id 和新的 inputValue 更新
    setInputValue(newInputValue); // 如果还需要保持局部状态
  };

  return (
    <DropzoneStyle>
      {console.log(items)}
      {console.log(filteredItems)}

      <div ref={drop} className="dropzone" style={styled}>
        <div className="title-part">
          <a
            onClick={() => removeDropzone(id)}
            style={{ display: showing ? "block" : "none" }}
          >
            +
          </a>

          <input
            type="text"
            placeholder="   Input question here"
            // value={inputValue}
            onChange={handleInputChange}
          />
        </div>
        <div className="dropitem">
          {filteredItems.map((item) => (
            <DraggableItem key={item.id} item={item} color={item.color} />
          ))}
        </div>
      </div>
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
    border-radius: 5px;
    transition: background-color 0.3s ease;
    box-shadow: 0 0 15px rgba(0, 0, 0, 0.1);
    flex-direction: column;
    display: flex;
    justify-content: start;
    flex-wrap: wrap;
  }

  .title {
    color: #ffffff;
    font-size: 1.5vh;

    height: auto;
    width: 90%;
    display: flex;
    align-items: center;
    flex-wrap: wrap;
  }

  .title-part {
    text-align: center;
    padding: 0.5rem 1rem;

    display: flex;
    border-radius: 5px 5px 0px 0px;
    -webkit-border-radius: 5px 5px 0px 0px;
    -moz-border-radius: 5px 5px 0px 0px;
    background-color: var(--secondary-color);
    width: 100%;
  }
  .dropitem {
    display: flex;
    padding: 1rem;

    flex-direction: column;
    gap: 0.5vw;
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
