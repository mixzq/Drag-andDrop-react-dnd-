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
  const [items, setItems] = useState([
    [
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
    ],
  ]);
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

  const editButtondandle = () => {
    ShowToggle();
    butttonTextSwitch();
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
          {console.log(items)}
          {console.log(dropzones, boardName)}
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
            >
              <BoardMaker
                board={boardName}
                setBoard={setBoardName}
                addNewBoard={addDropzone}
              />
              <div className="question_maker">
                <QestionMaker question={question} setQuestion={setQuestion} />
              </div>

              <OptionMaker
                dropzones={dropzones}
                items={items}
                setItems={setItems}
              />
            </div>
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
            </div>

            <div className="options">
              <div className="question">
                Question: <span>{question}</span>
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
                <div className="delete-zone">
                  <DeleteZone
                    handleDelete={handleDeletexxx}
                    showing={showing}
                  />
                </div>
              </div>
              <button onClick={updatDate} className="submit-button">
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
      justify-content: start;
      flex-wrap: wrap;
      gap: 20px;
    }
    .boardUnit {
      height: fit-content;
    }
  }

  .option_delete-zone {
    height: 80%;
    background-color: var(--optionsBoard-color);
    width: 100%;
    display: flex;
    border-radius: var(--border-radius);

    .option-zone {
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
    width: 75vw;
    min-width: 30vw;
    min-height: 10vh;
    height: 30vh;

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
    border-radius: var(--border-radius);
    width: auto;
    padding: 1vh;
    font-size: 1.5rem;
    height: 25%;
    color: #ffffff;
    padding-bottom: 1.5vh;
  }

  .quizMaker-zone {
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
