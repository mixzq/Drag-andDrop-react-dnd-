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

  const itemsssCreater = (name, group, id) => {
    return {
      id: id,
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
    var uuid = uuidv4();
    const newItem = itemsssCreater(optionNameInput, optionBoardInput, uuid);
    setItems([...items, newItem]);
    setOptionNameInput("");
    setoptionBoardInput("");
  };

  return (
    <OptionCreatorStyle>
      <div className="optionmaker">
        <div className="optionBoard">
          <p>3.Option:</p>
          {console.log(optionNameInput, optionBoardInput)}

          <input
            type="text"
            placeholder=" option text"
            onChange={handleNameInputChange}
            value={optionNameInput}
          />
          <p>4.Option should be:</p>
          <select
            class="dropdown"
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
              <span className="error">please fill up all the files </span>
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
    /* position: absolute;
    bottom: 12vh;
    width: 15vw; */
  }

  .error {
    font-size: 1vh;
    font-style: italic;
    color: #ff6f6f;
  }

  .bottons {
    display: flex;
    gap: 1vw;
    .pluss {
      cursor: pointer;
      font-size: 1.5vw;
      border: none;
      border-radius: 5px;

      width: 20%;
    }
  }

  .optionBoard {
    color: #ffffff;
    font-size: 1vw;

    /* border-bottom: 4px dashed #ffffff;
    border-top: 4px dashed #ffffff; */
    display: flex;
    flex-direction: column;
    gap: 1vh;
    padding: 30px 15px 30px 15px;
    input {
      padding: 5px;
      border: none;
      border-radius: 5px;
      height: 3vh;
    }
  }
  .dropdown {
    height: 3vh;
    border-radius: 5px;
    option {
      font-weight: 800;
    }
  }
`;
