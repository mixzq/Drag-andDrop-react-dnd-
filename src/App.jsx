import React, { useState, useEffect } from "react";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import Dropzone from "./components/Dropzone";
import "./App.css";
import styled from "styled-components";
import BoardMaker from "./components/BoardMaker";
import OptionMaker from "./components/OptionMaker";
import OptionZone from "./components/OptionZone";

import EditableText from "./components/EditableText";

function App() {
  //------adding board----''name -text
  const [boardName, setBoardName] = useState([]);

  ///----dropzone data----------------
  const [dropzones, setDropzones] = useState([]);

  const addDropzone = (name) => {
    //adding ---
    const newDropzone = { name };
    setDropzones([...dropzones, newDropzone]);
  };

  const removeDropzone = (name) => {
    setDropzones(dropzones.filter((dropzone) => dropzone.name !== name));
  }; ////------delete dropzone----

  //--------------
  //--------create items-------
  const [items, setItems] = useState([]);
  //------delete option(item)----
  const handleDeletexxx = (id) => {
    setItems(items.filter((item) => item.id !== id));
  };

  //-------------------------

  //----quesion data----

  const [itemsss, setItemsss] = useState([
    //-----catg: -> set option at origianl place ------
    {
      id: 1,
      name: "Manchester United",
      catg: "Options",
      group: "European Football Clubs",
    },
    {
      id: 2,
      name: "Brazil",
      catg: "Options",
      group: "World Cup Winning Nations",
    },
    {
      id: 3,
      name: "FC Barcelona",
      catg: "Options",
      group: "European Football Clubs",
    },
    {
      id: 4,
      name: "France",
      catg: "Options",
      group: "World Cup Winning Nations",
    },
    {
      id: 5,
      name: "Germany",
      catg: "Options",
      group: "World Cup Winning Nations",
    },
  ]);
  //----update items after all thr drag and drop--------
  const [newItems, setnewItems] = useState([]);

  const checkAnswer = (anwserNeedToCheck) => {
    const checkedAnwser = anwserNeedToCheck.map((e) => {
      let points = 0;

      if (e.catg === e.group) {
        points++;
        return { ...e, color: "#7d9c57" };
      } else if (e.catg === "Options") {
        return { ...e };
      }
      return { ...e, color: "#c34c6c" };
    });
    return checkedAnwser;
  };

  useEffect(() => {
    const newCheckedItems = checkAnswer(items);
    setnewItems(newCheckedItems);
  }, [items]);
  //---------------------------------------------
  //------------result---------------

  const updatDate = () => {
    setItems(newItems);
  };
  //------------------------------------------------------
  //----edeting button---------------
  const [testButton, setTestButton] = useState(true);
  const butttonTextSwitch = () => {
    setTestButton(!testButton);
  };

  const [showing, setShowing] = useState(true);

  const ShowToggle = () => {
    setShowing(!showing);
  };

  //----reset options--- take away color and put back to option zone---
  const resetItemsAttributes = () => {
    if (!testButton) {
      const resetOptions = items.map((item) => {
        const { color, ...rest } = item; // Removing color attribute
        return { ...rest, catg: "Options" }; // Resetting catg to "Options"
      });
      setItems(resetOptions);
    }
  };

  console.log("!!!!!!!!!!" + items);
  const editButtondandle = () => {
    ShowToggle();
    butttonTextSwitch();

    resetItemsAttributes();
  };

  //-----

  const handleDrop = (item, targetCatg) => {
    setItems((prevItems) => {
      const updatedItems = prevItems.map((i) =>
        i.id === item.id ? { ...i, catg: targetCatg } : i
      );

      return updatedItems;
    });
  };

  //------------------------------------------------------

  //----------------question part---------------
  const [question, setQuestion] = useState("");

  return (
    <DndProvider backend={HTML5Backend}>
      <BoardStyle>
        <div className="app-container">
          <div className="quizMaker-zone">
            <button className="edit-button" onClick={editButtondandle}>
              {testButton ? "Test" : "Edit"}
            </button>
            <div
              className="quizMaker"
              style={{
                display: showing ? "block" : "none",
                background: "var( --editor-color)",
                borderRadius: "var(--border-radius)",
              }}
            ></div>
          </div>

          <div className="quiz">
            <div className="board">
              {dropzones.map((dropzone, index) => (
                <div className="boardUnit" key={index}>
                  <Dropzone
                    catg={dropzone.name}
                    items={items}
                    handleDrop={handleDrop}
                    boardName={dropzone.name}
                    removeDropzone={removeDropzone}
                    showing={showing}
                  />
                </div>
              ))}
              <BoardMaker
                board={boardName}
                setBoard={setBoardName}
                addNewBoard={addDropzone}
                showing={showing}
              />
            </div>
            <div className="question">
              <EditableText initialText=" Enter question here" />
            </div>

            <div className="options">
              <div className="optionmaker">
                <OptionMaker
                  dropzones={dropzones}
                  items={items}
                  setItems={setItems}
                  handleDeletexxx={handleDeletexxx}
                  showing={showing}
                />
              </div>

              <div className="option_delete-zone">
                <div className="option-zone">
                  <OptionZone
                    catg="Options"
                    items={items}
                    setItems={setItems}
                    handleDrop={handleDrop}
                  />
                </div>
                <div className="sumbitzone">
                  <button
                    onClick={updatDate}
                    className="submit-button"
                    style={{
                      opacity: showing ? "0" : "1",
                      pointerEvents: showing ? "none" : "auto",
                    }}
                  >
                    SUBMIT
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </BoardStyle>
    </DndProvider>
  );
}

export default App;

const BoardStyle = styled.div`
  .app-container {
    display: flex;

    padding: 3vw;
    height: 100vh;
    .quiz {
      width: 100%;
      display: flex;
      height: 93vh;
      flex-direction: column;
      justify-content: center;
    }
    .board {
      height: 55vh;
      width: 100%;
      display: flex;
      justify-content: center;
      flex-wrap: wrap;
      gap: 20px;
    }
    .boardUnit {
      height: fit-content;
    }
  }

  .option_delete-zone {
    height: 100%;
    /* border: 1px solid #ffffff; */
    width: 100%;
    display: flex;
    flex-direction: column;
    border-radius: var(--border-radius);
    justify-content: center;
    align-items: center;

    .option-zone {
      height: 80%;
      width: 100%;
    }
  }

  .options {
    display: flex;
    padding: 1vh;
    /* position: absolute; */
    align-items: start;
    flex-direction: column;
    bottom: 5vh;
    width: 100%;
    min-width: 30vw;
    min-height: 10vh;
    height: 35vh;

    border-radius: 20px;
    justify-content: space-between;
    .options-title {
      font-size: 1.5rem;
      color: white;
    }
  }

  .optionmaker {
    width: 100%;
  }

  .optionzone {
    padding: 1.5vw;
    display: flex;
    justify-content: center;
    height: 100%;

    flex-wrap: wrap;
    gap: 1vw;
    max-width: 99vw;
  }

  span {
    color: #ffffff;
  }
  .question {
    display: flex;
    border-radius: var(--border-radius);
    width: 100%;
    padding: 1vh;
    font-size: 2vh;
    font-style: italic;
    justify-content: center;

    height: 25%;
    color: #975858;
    padding-bottom: 1.5vh;
  }

  .quizMaker-zone {
    position: absolute;
    gap: 3vh;
    display: flex;
    flex-direction: column;
  }
  .quizmaker {
    transition: ease-in-out 0.5s;
    height: 50vh;
    background-color: #467d7d;
    /* background-color: var(--secondary-color); */
  }
  .edit-button {
    text-align: center;
    padding: 5px 20px;
    background-color: #faf1e4;
    width: fit-content;
    height: 3vh;
    font-size: 1.5vh;
    font-weight: 600;
    cursor: pointer;
    border-radius: var(--border-radius);
    border: none;
  }

  .sumbitzone {
    display: flex;
    justify-content: center;
    align-items: center;

    width: 8%;
  }

  ///bacground image-------------

  /* CSS */
  .submit-button {
    border: none;
    background-color: var(--secondary-color);
    border-radius: 15px;
    box-sizing: border-box;
    color: #ffffff;
    cursor: pointer;
    display: inline-block;
    font-family: -apple-system;

    font-size: 1.5vh;
    font-weight: 600;
    line-height: normal;
    margin: 0;
    min-height: 4vh;
    min-width: 0;
    outline: none;
    /* 
    text-align: center;
    text-decoration: none; */
    transition: all 300ms cubic-bezier(0.23, 1, 0.32, 1);
    /* user-select: none; */
    /* -webkit-user-select: none; */
    /* touch-action: manipulation; */
    width: 100%;
    /* will-change: transform; */
  }

  .submit-button:hover {
    box-shadow: rgba(0, 0, 0, 0.25) 0 8px 15px;
    transform: translateY(-2px);
  }

  .submit-button:active {
    box-shadow: none;
    transform: translateY(0);
  }
`;
