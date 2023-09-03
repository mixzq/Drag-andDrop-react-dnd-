import React, { useState, useEffect } from "react";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import Dropzone from "./components/Dropzone";
import "./App.css";
import styled from "styled-components";
import BoardMaker from "./components/BoardMaker";
import OptionMaker from "./components/OptionMaker";
import OptionZone from "./components/OptionZone";
import QestionMaker from "./components/QestionMaker";
import DeleteZone from "./components/DeleteZone";
import { v4 as uuidv4 } from "uuid";
import EditableText from "./components/EditableText";

function App() {
  //------adding board----''name -text
  const [boardName, setBoardName] = useState([]);

  ///----dropzone data----------------
  const [dropzones, setDropzones] = useState([]);

  const addDropzone = (name) => {
    //adding ---
    const newDropzone = { id: uuidv4(), name };
    setDropzones([...dropzones, newDropzone]);
  };

  const updateDropzoneById = (id, newValue) => {
    const updatedDropzones = dropzones.map((dropzone) => {
      if (dropzone.id === id) {
        return { ...dropzone, name: newValue };
      }
      return dropzone;
    });
    setDropzones(updatedDropzones);
  };

  const removeDropzone = (id) => {
    setDropzones(dropzones.filter((dropzone) => dropzone.id !== id));
    const newDropzones = [...dropzones];
    newDropzones.splice(index, 1);
    setDropzones(newDropzones);
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
        return { ...e, color: "#dbf9b7" };
      } else if (e.catg === "Options") {
        return { ...e };
      }
      return { ...e, color: "pink" };
    });
    return checkedAnwser;
  };

  useEffect(() => {
    const newCheckedItems = checkAnswer(items);
    setnewItems(newCheckedItems);
  }, [items]);
  //---------------------------------------------
  //------------result---------------
  const [result, setResult] = useState();

  const updatDate = () => {
    setItems(newItems);
    console.log(items);
    const rightAnswere = items.filter((item) => item.color === "lightgreen");
    setResult(rightAnswere.length);
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

  const removeColorAttribute = () => {
    const newItems = items.map((item) => {
      const { color, ...rest } = item;
      return rest;
    });

    setItems(newItems);
  };

  const editButtondandle = () => {
    ShowToggle();
    butttonTextSwitch();
    removeColorAttribute();
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
          </div>

          <div className="quiz">
            {console.log(dropzones)}
            <div className="board">
              {dropzones.map((dropzone) => (
                <div className="boardUnit" key={dropzone.id}>
                  <Dropzone
                    catg={dropzone.name}
                    items={items}
                    handleDrop={handleDrop}
                    boardName={dropzone.name}
                    removeDropzone={removeDropzone}
                    showing={showing}
                    board={boardName}
                    setBoard={setBoardName}
                    addDropzone={addDropzone}
                    key={dropzone.id}
                    id={dropzone.id}
                    updateDropzoneById={updateDropzoneById}
                  />
                </div>
              ))}
              <BoardMaker
                board={boardName}
                setBoard={setBoardName}
                addDropzone={addDropzone}
              />
            </div>

            <div className="question">
              <EditableText initialText="Enter question here" />
            </div>
            <div
              className="quizMaker"
              style={{
                display: showing ? "block" : "none",
                background: "var( --editor-color)",
                borderRadius: "var(--border-radius)",
              }}
            >
              <OptionMaker
                dropzones={dropzones}
                items={items}
                setItems={setItems}
              />
            </div>

            <div className="options">
              <div className="option_delete-zone">
                <div className="option-zone">
                  <OptionZone
                    catg="Options"
                    items={items}
                    setItems={setItems}
                    handleDrop={handleDrop}
                  />
                </div>
                <div className="delete-zone">
                  <DeleteZone
                    handleDelete={handleDeletexxx}
                    showing={showing}
                  />
                </div>
              </div>
              <button
                onClick={updatDate}
                className="submit-button"
                style={{
                  opacity: showing ? "0" : "1",
                  pointerEvents: showing ? "none" : "auto",
                }}
              >
                submit
              </button>
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
    gap: 20px;
    padding: 3vw;
    height: 100vh;
    .quiz {
      display: flex;
      height: 93vh;
      flex-direction: column;
      justify-content: space-between;
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
    height: 80%;
    /* border: 1px solid #ffffff; */

    width: 100%;
    display: flex;
    flex-direction: column;

    .option-zone {
      width: 100%;
    }
  }

  .options {
    display: flex;

    /* position: absolute; */
    align-items: start;
    flex-direction: column;
    bottom: 5vh;
    width: 75vw;
    min-width: 30vw;
    min-height: 10vh;
    height: 35vh;

    border-radius: 20px;
    justify-content: space-between;
    .options-title {
      font-size: 1.5rem;
      color: white;
    }
    .delete-zone {
      display: flex;
      justify-content: end;
    }
  }

  .optionzone {
    display: flex;
    justify-content: center;
    padding: 1.5vw;
    display: flex;
    height: 100%;

    flex-wrap: wrap;
    gap: 1vw;
    max-width: 99vw;
  }

  span {
    color: #ffffff;
  }
  .question {
    height: 15vh;
    width: 100%;
    background-color: var(--questionBoard-color);
    border-radius: var(--border-radius);
    display: flex;
    border-radius: var(--border-radius);

    color: #ffffff;
    padding-bottom: 1.5vh;
    width: 100%;
    justify-content: center;
  }

  .quizMaker-zone {
    gap: 3vh;
    display: flex;
    flex-direction: column;
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
  .submit-button {
    cursor: pointer;
    padding: 5px 20px;
    margin-top: 2vh;
    width: fit-content;
    height: 3vh;
    font-size: 1.5vh;
    font-weight: 600;
    border-radius: var(--border-radius);
    border: none;
    button {
      background-color: #faf1e4;
    }
  }

  ///bacground image-------------
`;
