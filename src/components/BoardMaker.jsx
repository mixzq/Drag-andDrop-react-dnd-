import React from "react";
import styled from "styled-components";
import { useState } from "react";

function BoardMaker({ addDropzone }) {
  const handleButtonClick = () => {
    addDropzone();
  };

  return (
    <Boardmaker>
      <div className="bottons">
        <button className="pluss" onClick={handleButtonClick}>
          +
        </button>
      </div>
    </Boardmaker>
  );
}

export default BoardMaker;
const Boardmaker = styled.div`
  .bottons {
    width: 2vw;
    height: 4vh;
    display: flex;
    gap: 1vw;
    button {
      clip-path: circle(50% at 50% 50%);
      padding: px;
      cursor: pointer;
      font-size: 2vw;
      border: none;
      border-radius: 2px;

      width: 100%;
    }
  }
`;
