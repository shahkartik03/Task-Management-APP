import React, {useEffect, useState} from "react";
import classNames from "classnames";
import { useDispatch, useSelector } from "react-redux";
import { DragDropContext } from "react-beautiful-dnd";
import "./index.scss";
import {
  addNewItem, deleteCard, deleteItem, dragCard,
} from "@/redux/actions";
import CardView from "@/components/CardView";
import AddItem from "@/components/AddItem";
import { getMaxAllowedCount } from "../../api/request";

function Board() {
  const [allowedItems, setAllowedItems] = useState(3);
  const [fetchErr, setFetchErr] = useState("");
  const items = useSelector((state) => state.items);
  const fetchingErr = useSelector((state) => state.fetchingErr);
  useEffect(() => {
    getMaxAllowedCount()
      .then((res) => {
          console.log('check ', res.item);
        setAllowedItems(res.data.item[0]);
      })
      .catch((err) => {
        setFetchErr(err);
      });
  }, []);
  const dispatch = useDispatch();
  function handleDragEnd(result) {
    dispatch(dragCard(result));
  }
  if (fetchingErr !== "" || fetchErr !== "") {
      console.log('fetchingErr  ', fetchingErr, 'fetchErr ', fetchErr);
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
        {items.length < allowedItems && (<AddItem dispatchAction={addNewItem} label="Add another list" placeHolder="Item Name" />)}
      </DragDropContext>
    </div>
  );
}

export default Board;
