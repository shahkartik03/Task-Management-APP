import React from "react";
import classNames from "classnames";
import { useDispatch, useSelector } from "react-redux";
import { DragDropContext } from "react-beautiful-dnd";
import "./index.scss";
import {
  addNewItem, deleteCard, deleteItem, dragCard,
} from "@/redux/actions";
import CardView from "@/components/CardView";
import AddItem from "@/components/AddItem";

function Board() {
  const items = useSelector((state) => state.items);
  const fetchingErr = useSelector((state) => state.fetchingErr);
  const dispatch = useDispatch();
  function handleDragEnd(result) {
    dispatch(dragCard(result));
  }
  if (fetchingErr !== "") {
    return (
      <div className={classNames("Board", "Board__broken")}>
        Something is broken, visit later.
      </div>
    );
  }
  return (
    <div className="Board">
      <DragDropContext onDragEnd={handleDragEnd}>
        {items.map((item) => (
          <CardView
            item={item}
            deleteItem={(id) => dispatch(deleteItem(id))}
            deleteCard={(itemId, index) => dispatch(deleteCard(itemId, index))}
          />
        ))}
        {items.length < 4 && (<AddItem dispatchAction={addNewItem} label="Add another list" placeHolder="Item Name" />)}
      </DragDropContext>
    </div>
  );
}

export default Board;
