import React from "react";
import styled from "styled-components";
import { useState } from "react";
import { v4 as uuidv4 } from "uuid";

function OptionMaker({ dropzones, items, setItems }) {
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

  const [showError, setShowError] = useState(false);

  const hideError = () => {
    setShowError(false);
    document.removeEventListener("mousedown", hideError);
  };

  //---------------

  //-----------itesm creating---------------------

  const itemsssCreater = (name, group) => {
    return {
      name: name,
      catg: "Options", //options start place
      group: group,
    };
  };

  const handleButtonClick = () => {
    if (!optionBoardInput || !optionNameInput) {
      setShowError(true);
      document.addEventListener("mousedown", hideError);
      return;
    }

    //------id uuid----

    const newItem = itemsssCreater(optionNameInput, optionBoardInput);
    setItems([...items, newItem]);
    setOptionNameInput("");
    setoptionBoardInput("");
  };

  return (
    <OptionCreatorStyle>
      <div className="optionmaker">
        <div className="optionBoard">
          <p>Option:</p>
          {console.log(optionNameInput, optionBoardInput)}

          <input
            type="text"
            placeholder=" option text"
            onChange={handleNameInputChange}
            value={optionNameInput}
          />
          <p>Option should be:</p>
          <select
            className="dropdown"
            onChange={boardInputChange}
            value={optionBoardInput}
          >
            <option value="" disabled selected hidden>
              (Choose the board)
            </option>
            {changedDropzones.map((name, index) => (
              <option key={index} value={name}>
                {name}
              </option>
            ))}
          </select>

          <div className="bottons">
            <button className="pluss" onClick={handleButtonClick}>
              +
            </button>
            {showError && (
              <span className="error">
                Please make sure you have filled in all the files !!{" "}
              </span>
            )}
          </div>
        </div>
      </div>
    </OptionCreatorStyle>
  );
}

export default OptionMaker;
const OptionCreatorStyle = styled.div`
  .optionmaker {
  }

  .error {
    display: flex;
    align-items: center;
    width: 20vw;
    font-size: 1vh;
    font-style: italic;
    color: #ffffff;
  }

  .bottons {
    display: flex;
    gap: 1vw;
    .pluss {
      width: 5vw;
      cursor: pointer;
      font-size: 1.5vw;
      border: none;
    }
  }

  .optionBoard {
    width: 100%;
    color: #ffffff;
    font-size: 1vw;

    display: flex;
    gap: 1vh;
    padding: 10px 15px 10px 15px;
    input {
      width: 20vw;
      padding: 2px;
      border: none;

      height: 2vh;
    }
  }

  p {
    display: block;
  }

  .dropdown {
    height: 2vh;

    option {
      font-weight: 800;
    }
  }
`;
