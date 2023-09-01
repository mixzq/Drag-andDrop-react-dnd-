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
            autoFocus
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
  }
  textarea {
    border: 0;
    outline: 0;
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
  }
  textarea:focus {
    border: 2px solid #1fddba5b;
  }

  textarea::-webkit-scrollbar {
    width: 15px; /* 宽度 */
  }

  textarea::-webkit-scrollbar-thumb {
    background-color: #1fddba5b; /* 滚动条颜色 */
    border-radius: 10px; /* 圆角 */
  }

  textarea::-webkit-scrollbar-thumb:hover {
    background-color: #ffffff8c; /* 滚动条悬停颜色 */
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
    align-items: center;
  }
  .display-text:hover {
    background-color: #77e9b429;
    border: 1px solid #c5f2dd29;
  }
`;
