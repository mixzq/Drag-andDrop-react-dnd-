import React from "react";
import styled from "styled-components";
import { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import DeleteZone from "./DeleteZone";
import { motion } from "framer-motion";

function OptionMaker({ dropzones, items, setItems, handleDeletexxx, showing }) {
  //----dropzones data change---
  const changedDropzones = dropzones.map((item) => item.name);

  //----boardName choosing value---------
  const [optionBoardInput, setoptionBoardInput] = useState();

  const boardInputChange = (e) => {
    setoptionBoardInput(e.target.value);
  };
  //----------------------------------------------
  //---------boardName name value---------
  const [optionNameInput, setOptionNameInput] = useState();

  const handleNameInputChange = (e) => {
    setOptionNameInput(e.target.value);
  };

  //------------------------------------------------------------

  ///------alert  part--------------

  const [inpuError1, setInputError1] = useState(false);
  const [dropDownError2, setDropDownError2] = useState(false);

  const hideError = () => {
    setInputError1(false);
    setDropDownError2(false);
    document.removeEventListener("mousedown", hideError);
  };

  //---------------
  //--------random order----
  const shuffleArray = (array) => {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  };

  //-----------itesm creating---------------------

  const itemsssCreater = (name, group, id) => {
    return {
      id: id,
      name: name,
      catg: "Options", //options start place
      group: group,
    };
  };

  const handleButtonClick = () => {
    let hasError = false;

    if (!optionBoardInput) {
      setDropDownError2(true);

      hasError = true;
    }

    if (!optionNameInput) {
      setInputError1(true);
      hasError = true;
    }

    if (hasError) {
      document.addEventListener("mousedown", hideError);
      return;
    }

    //------id uuid----
    var uuid = uuidv4();
    const newItem = itemsssCreater(optionNameInput, optionBoardInput, uuid);
    const newItems = [...items, newItem];
    setItems(shuffleArray(newItems));
    setOptionNameInput("");
    setoptionBoardInput("");
  };

  // const styled = {
  //   display: showing ? "flex" : "none",
  // };
  ///animation-----
  const variants = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: { opacity: 1, scale: 1 },
  };

  return (
    <OptionCreatorStyle
      initial="hidden"
      animate={showing ? "visible" : "hidden"}
      variants={variants}
    >
      {console.log(inpuError1, dropDownError2)}
      <div className="optionmaker">
        <div className="optionBoard">
          <p>OPTION:</p>

          <input
            className={inpuError1 ? "inputError" : "inputRight"}
            type="text"
            placeholder=" Enter option"
            onChange={handleNameInputChange}
            value={optionNameInput}
          />
          <p>BOARD NAME:</p>
          <select
            className={dropDownError2 ? "dropdownError" : "dropdownRight"}
            onChange={boardInputChange}
            value={optionBoardInput}
          >
            <option value="" disabled selected hidden>
              (Choose the board)
            </option>
            {console.log(changedDropzones)}
            {changedDropzones.map((name, index) => (
              <option key={index} value={name}>
                {name}
              </option>
            ))}
          </select>

          <div className="buttons">
            <a className="pluss" onClick={handleButtonClick}>
              <img src="plus.svg" alt="" />
            </a>
          </div>
          <div className="delete-zone ">
            <DeleteZone handleDelete={handleDeletexxx} showing={showing} />
          </div>
        </div>
      </div>
    </OptionCreatorStyle>
  );
}

export default OptionMaker;
const OptionCreatorStyle = styled(motion.div)`
  .optionmaker {
    display: flex;
    justify-content: center;
    width: 100%;
  }

  .error {
    display: flex;
    align-items: center;

    width: 15;
    font-size: 1.2vh;
    font-style: italic;
    color: #ff0000;
  }

  .buttons {
    display: flex;

    .pluss {
      display: flex;
      justify-content: center;
      align-items: center;
      cursor: pointer;
      background-color: transparent;
    }
    .pluss:hover {
      transform: translateY(-2px);
      transition: transform 0.1s ease-out;
    }
  }

  .optionBoard {
    justify-content: center;
    align-items: center;
    border-radius: 20px;
    width: fit-content;
    color: #ffffff;
    font-size: 1.2vh;
    display: flex;
    gap: 1vh;
    padding: 10px 20px 10px 20px;
    background-color: #303030;
    /////-----error part---------
    .inputRight {
      width: 15vw;
      padding: 8px;
      border: none;
      border-radius: 5px;
      height: 3vh;
      transition: border 0.1s ease-in-out;
    }
    .inputError {
      width: 15vw;
      padding: 8px;
      border: none;
      border-radius: 5px;
      height: 3vh;
      border: 2px solid #ff0000;
      transition: border 0.1s ease-in-out;
    }
  }
  .dropdownError {
    font-size: 1.2vh;
    height: 3vh;
    border-radius: 5px;
    border: 2px solid #ff0000;
    transition: border 0.1s ease-in-out;
    option {
      font-weight: 800;
    }
  }
  .dropdownRight {
    font-size: 1.2vh;
    height: 3vh;
    border-radius: 5px;
    transition: border 0.1s ease-in-out;
    option {
      font-weight: 800;
    }
  }
  p {
    display: flex;
    align-items: center;
  }

  .delete-zone {
    align-items: center;
    display: flex;
    justify-content: center;
  }
`;
