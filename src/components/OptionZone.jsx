import React from "react";
import { useEffect } from "react";
import { useDrop } from "react-dnd";
import DraggableItem from "./DraggableItem";

function OptionZone({ catg, items, handleDrop }) {
  const [{ isOver }, drop] = useDrop({
    accept: "ITEM",
    drop: (item) => handleDrop(item, catg),
    collect: (monitor) => ({ isOver: monitor.isOver() }),
  });

  const filteredItems = items.filter((item) => item.catg === catg);

  return (
    <div ref={drop} className="optionzone ">
      {filteredItems.map((item) => (
        <DraggableItem
          key={item.id}
          item={item}
          color={item.color}
          style={{ backGroundColor: isOver ? "gray" : "none" }}
        />
      ))}

      {/* {console.log(items)} */}
    </div>
  );
}

export default OptionZone;
