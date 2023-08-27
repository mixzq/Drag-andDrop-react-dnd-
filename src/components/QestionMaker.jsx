import { useState } from "react";
import React from "react";
import styled from "styled-components";

function QestionMaker({ question, setQuestion }) {
  const [ishidden, setIshidden] = useState(true);
  const [buttonText, setButtonText] = useState("SAVE");

  const buttonTextHandler = () => {
    setButtonText(buttonText === "CHANGE" ? "SAVE" : "CHANGE");
  };

  const hiddenSwitch = () => {
    setIshidden(!ishidden);
    buttonTextHandler();
  };

  const buttonHandler = (e) => {
    setQuestion(e.target.value);
  };

  return (
    <QestionMakerStyle ishidden={ishidden}>
      <div className="questionMaker">
        <p>2.Question</p>
        <div className="inputzone">
          <textarea
            type="text"
            placeholder=" Write your question here"
            className="questionInput"
            onChange={buttonHandler}
          ></textarea>
          {/* <button onClick={hiddenSwitch}>{buttonText}</button> */}
        </div>
      </div>
    </QestionMakerStyle>
  );
}

export default QestionMaker;
const QestionMakerStyle = styled.div`
  .questionMaker {
    font-size: 1vw;
    color: #ffffff;

    padding: 1vh;
    /* border-top: 4px dashed #ffffff;
    border-bottom: 4px dashed #ffffff; */
  }
  .inputzone {
    padding: 1vh;
    display: flex;
    flex-direction: column;
    textarea {
      padding: 5px;
      resize: none;
      display: ${(props) => (props.ishidden ? "flex" : "none")};
    }
  }
  button {
    height: 3vh;
    width: 10vh;
    border-radius: 5px;
    border: none;
    font-size: large;
    font-weight: 600;
  }

  textarea {
    width: 100%;
    height: 10vh;
    border-radius: 5px;

    border: none;
    font-size: 1rem;
  }
`;
