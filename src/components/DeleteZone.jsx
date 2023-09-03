import React from "react";
import { useDrop } from "react-dnd";
import styled from "styled-components";

function DeleteZone({ handleDelete, showing }) {
  const [{ isOver }, drop] = useDrop({
    accept: "ITEM",
    drop: (item) => handleDelete(item.id),
    collect: (monitor) => ({ isOver: monitor.isOver() }),
  });

  const styled = {
    backgroundColor: isOver ? "rgba(218, 116, 116, 0.8)" : "rgba(0, 0, 0, 0.0)",
    transform: isOver ? "scale(1.1)" : "scale(1)",
    transition: "transform 0.2s ease",
  };

  return (
    <DeleteZoneStyle>
      <div ref={drop} className="DeleteZone" style={styled}>
        <img src="trash-white.svg" alt="" />
        <p>Drop here to delete options</p>
      </div>
    </DeleteZoneStyle>
  );
}

export default DeleteZone;

const DeleteZoneStyle = styled.div`
  .DeleteZone {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 3vh;
    border-radius: 0px;
    padding: 5px;
    text-align: center;
    border: 0.2vh dashed #ffffff;
    border-radius: 8px;

    transition: background-color 0.3s ease;

    p {
      font-size: 1.2vh;
      color: #ffffff;
    }
  }
  img {
    height: 100%;
    width: auto;
  }
`;
