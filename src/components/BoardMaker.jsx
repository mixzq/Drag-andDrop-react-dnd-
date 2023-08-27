import React from "react";
import styled from "styled-components";
import { useState } from "react";

function BoardMaker({ board, setBoard, addNewBoard }) {
  //------adding board
  const [inputValue, setInputValue] = useState("");

  // const [array, setArray] = useState([]);
  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };
  const handleButtonClick = () => {
    setBoard([...board, inputValue]);
    setInputValue("");
    addNewBoard(inputValue);
  };

  return (
    <Boardmaker>
      <div className="boardmaker">
        <div className="Makerboard">
          1.Board Name:
          <input
            type="text"
            placeholder="   Input question here"
            value={inputValue}
            onChange={handleInputChange}
          />
          <div className="bottons">
            <button className="pluss" onClick={handleButtonClick}>
              +
            </button>
          </div>
        </div>
      </div>
    </Boardmaker>
  );
}

export default BoardMaker;
const Boardmaker = styled.div`
  .boardmaker {
    width: 15vw;
  }

  .bottons {
    display: flex;
    gap: 1vw;
    button {
      cursor: pointer;
      font-size: 1.5vw;
      border: none;
      border-radius: 5px;

      width: 20%;
    }
  }
  .Makerboard {
    color: #ffffff;
    font-size: 1vw;

    /* border-bottom: 4px dashed #ffffff; */
    display: flex;
    flex-direction: column;
    gap: 1vh;
    padding: 15px 15px 30px 15px;
    input {
      padding: 5px;
      border: none;
      border-radius: 5px;
      height: 3vh;
    }
  }
`;
