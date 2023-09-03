import React, { useState } from "react";
import styled from "styled-components";

const EditableText = ({ initialText }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [text, setText] = useState(initialText);

  const handleClick = () => {
    setIsEditing(true);
  };

  const handleBlur = () => {
    setIsEditing(false);
  };

  const handleChange = (e) => {
    setText(e.target.value);
  };

  //--------CSS-------------

  return (
    <EditableTextStyle>
      <div className="EditableText">
        {isEditing ? (
          <textarea
            type="text"
            onBlur={handleBlur}
            onChange={handleChange}
            value={text}
          />
        ) : (
          <div className="display-text" onClick={handleClick}>
            <div className="textPart">{text}</div>
          </div>
        )}
      </div>
    </EditableTextStyle>
  );
};

export default EditableText;
const EditableTextStyle = styled.div`
  .EditableText {
    display: flex;
    justify-content: center;
    align-items: center;
    font-family: Arial, sans-serif;
  }
  textarea {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 70vw;
    height: 8vh;
    color: white;
    cursor: text;
    padding: 10px;
    font-size: 2vh;
    background-color: transparent;
    resize: none;
    /* Webkit 浏览器的滚动条样式 */
    ::-webkit-scrollbar {
      width: 12px;
    }
    ::-webkit-scrollbar-thumb {
      background-color: darkgrey;
      outline: 1px solid slategrey;
    }
    ::-webkit-scrollbar-thumb:hover {
      background: #7b7b7b;
    }
    ::-webkit-scrollbar-track {
      background: lightgrey;
    }

    /* Firefox 的滚动条样式 */
    scrollbar-width: thin;
    scrollbar-color: darkgrey lightgrey;
  }

  .display-text {
    text-align: center;
    width: 70vw;
    cursor: pointer;
    padding: 10px;
    font-size: 2vh;
    color: white;
    height: 5vh;
    display: flex;
    justify-content: center;
    align-items: center; //
  }
  .display-text:hover {
    background-color: #77e9b429;
    border: 1px solid #c5f2dd29;
  }
`;
