import React from "react";
import styled from "styled-components";
import { useState } from "react";
import { motion } from "framer-motion";

function BoardMaker({ board, setBoard, addNewBoard, showing }) {
  //------adding board
  const [inputValue, setInputValue] = useState("");

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };
  //--------------error----------------------
  const [showError, setShowError] = useState(false);

  const hideError = () => {
    setShowError(false);
    document.removeEventListener("mousedown", hideError);
  };
  const handleButtonClick = () => {
    if (inputValue === "") {
      setShowError(true);
      document.addEventListener("mousedown", hideError);
      return; //-----error part
    }
    setBoard([...board, inputValue]);
    setInputValue("");
    addNewBoard(inputValue);
  };

  //----animation----------
  const variants = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: { opacity: 1, scale: 1 },
  };

  return (
    <Boardmaker
      initial="hidden"
      animate={showing ? "visible" : "hidden"}
      variants={variants}
    >
      <div className="boardmaker">
        <div className="Makerboard">
          <input
            className={showError ? "inputError" : "inputNormal"}
            type="text"
            placeholder="Enter Board Name"
            value={inputValue}
            onChange={handleInputChange}
          />
          <div className="buttons">
            <a className="pluss" onClick={handleButtonClick}>
              <img src="plus.svg" alt="" />
            </a>
          </div>
        </div>
      </div>
    </Boardmaker>
  );
}

export default BoardMaker;
const Boardmaker = styled(motion.div)`
  .boardmaker {
    width: auto;
    height: auto;
    border-radius: 20px;
    display: flex;
    background-color: #303030;
  }

  .buttons {
    display: flex;

    a {
      cursor: pointer;
      font-size: 1.2vw;
      border: none;
      border-radius: 5px;

      width: 20%;
    }
    a:hover {
      transform: translateY(-2px);
      transition: transform 0.1s ease-out;
    }
  }
  .Makerboard {
    color: #ffffff;
    font-size: 1vw;

    /* border-bottom: 4px dashed #ffffff; */
    display: flex;

    gap: 1vh;
    padding: 1.8vh;
    .inputNormal {
      padding: 5px;
      border-radius: 5px;
      height: 3vh;
      transition: border 0.1s ease-in-out;
    }
    .inputError {
      padding: 5px;
      border: 2px solid #eb3a3a;
      border-radius: 5px;
      height: 3vh;
      transition: border 0.1s ease-in-out;
    }
  }
`;
