import React from "react";
import styled from "styled-components";

function InputLine() {
  return (
    <InputStyle>
      <div className="inputDiv">
        <input
          class="effect-1"
          type="text"
          placeholder="Placeholder Text"
        ></input>
        <span class="focus-border"></span>
      </div>
    </InputStyle>
  );
}

export default InputLine;
const InputStyle = styled.div`
  .inputDiv {
    .col-3 {
      float: left;
      width: 27.33%;
      margin: 40px 3%;
      position: relative;
    } /* necessary to give position: relative to parent. */
  }
  .effect-1 {
    border: 0;
    padding: 7px 0;
    border-bottom: 1px solid #ccc;
  }
  .effect-1 ~ .focus-border {
    position: absolute;
    bottom: 0;
    left: 0;
    width: 0;
    height: 2px;
    background-color: #4caf50;
    transition: 0.4s;
  }
  .effect-1:focus ~ .focus-border {
    width: 100%;
    transition: 0.4s;
  }
  input[type="text"] {
    font: 15px/24px "Lato", Arial, sans-serif;
    color: #333;
    width: 100%;
    box-sizing: border-box;
    letter-spacing: 1px;
  }
`;
