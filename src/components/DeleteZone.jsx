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
    display: showing ? "block" : "none",
  };

  return (
    <DeleteZoneStyle>
      <div ref={drop} className="DeleteZone" style={styled}>
        <h3>Drop here</h3>
        <h3>to delete</h3> <h3> options</h3>
      </div>
    </DeleteZoneStyle>
  );
}

export default DeleteZone;

const DeleteZoneStyle = styled.div`
  .DeleteZone {
    border-radius: 0px 10px 21px 0px;
    -webkit-border-radius: 0px 10px 21px 0px;
    -moz-border-radius: 0px 10px 21px 0px;
    padding: 15px;
    text-align: center;
    border: 2px dashed #ffffff;
    height: 100%;

    transition: background-color 0.3s ease;

    h3 {
      font-size: 1.2vh;
      color: #ffffff;
    }
  }
`;
